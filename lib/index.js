// src/index.ts
import { randomUUID as randomUUID2 } from "node:crypto";

// src/engine.ts
import { spawn } from "node:child_process";
import { randomUUID } from "node:crypto";
import { open, writeFile, mkdir, mkdtemp, realpath, lstat, readdir, rename, rmdir, rm, chmod, symlink } from "node:fs/promises";
import path from "node:path";
var MARKERS = "refs/git-tree-viz/tags/";
var HASH = /^[0-9a-f]{7,64}$/i;
function resolveConfig(input = {}) {
  const result = { gitTimeoutMs: input.gitTimeoutMs ?? 12e4, maxOutputBytes: input.maxOutputBytes ?? 134217728, maxPatchCharacters: input.maxPatchCharacters ?? 2e5 };
  for (const [key, value] of Object.entries(result)) if (!Number.isSafeInteger(value) || value < 1) throw new Error(`Invalid ${key}: expected a positive integer`);
  return result;
}
function inside(parent, candidate) {
  const relative = path.relative(parent, candidate);
  return relative === "" || !relative.startsWith(".." + path.sep) && relative !== ".." && !path.isAbsolute(relative);
}
async function exists(file) {
  try {
    await lstat(file);
    return true;
  } catch (error) {
    if (error.code === "ENOENT") return false;
    throw error;
  }
}
var ByteReader = class {
  buffer = Buffer.alloc(0);
  iterator;
  constructor(stream) {
    this.iterator = stream[Symbol.asyncIterator]();
  }
  async read(size) {
    while (this.buffer.length < size) {
      const next = await this.iterator.next();
      if (next.done) throw new Error("Git blob stream ended early");
      this.buffer = Buffer.concat([this.buffer, typeof next.value === "string" ? Buffer.from(next.value) : next.value]);
    }
    const result = this.buffer.subarray(0, size);
    this.buffer = this.buffer.subarray(size);
    return result;
  }
  async line() {
    while (!this.buffer.includes(10)) {
      const next = await this.iterator.next();
      if (next.done) throw new Error("Git blob header missing");
      this.buffer = Buffer.concat([this.buffer, typeof next.value === "string" ? Buffer.from(next.value) : next.value]);
    }
    const end = this.buffer.indexOf(10);
    const result = this.buffer.subarray(0, end).toString("utf8");
    this.buffer = this.buffer.subarray(end + 1);
    return result;
  }
};
var GitEngine = class {
  constructor(config) {
    this.config = config;
  }
  children = /* @__PURE__ */ new Set();
  grants = /* @__PURE__ */ new Map();
  exports = /* @__PURE__ */ new Set();
  mutations = Promise.resolve();
  disposed = false;
  async command(repo, args, signal, input) {
    if (this.disposed) throw new Error("Git Tree plugin is stopped");
    signal?.throwIfAborted();
    return new Promise((resolve, reject) => {
      const child = spawn("git", ["-C", repo, ...args], { windowsHide: true, stdio: ["pipe", "pipe", "pipe"], env: { ...process.env, GIT_TERMINAL_PROMPT: "0", GIT_LFS_SKIP_SMUDGE: "1" } });
      this.children.add(child);
      const output = [];
      const errors = [];
      let size = 0;
      let failure;
      const cancel = () => {
        failure = new Error("Git operation cancelled");
        child.kill();
      };
      const timer = setTimeout(() => {
        failure = new Error("Git operation timed out");
        child.kill();
      }, this.config.gitTimeoutMs);
      signal?.addEventListener("abort", cancel, { once: true });
      child.stdout.on("data", (chunk) => {
        size += chunk.length;
        if (size > this.config.maxOutputBytes) {
          failure = new Error("Git output exceeds the configured limit");
          child.kill();
        } else output.push(chunk);
      });
      child.stderr.on("data", (chunk) => {
        if (errors.reduce((n, b) => n + b.length, 0) < 65536) errors.push(chunk);
      });
      child.on("error", (error) => {
        failure = error;
      });
      child.on("close", (code) => {
        clearTimeout(timer);
        signal?.removeEventListener("abort", cancel);
        this.children.delete(child);
        if (failure) reject(failure);
        else if (code !== 0) reject(new Error(Buffer.concat(errors).toString("utf8").trim() || `Git exited ${code}`));
        else resolve(Buffer.concat(output));
      });
      child.stdin.on("error", (error) => {
        if (!failure) failure = error;
      });
      child.stdin.end(input);
    });
  }
  async git(repo, args, signal, input) {
    return (await this.command(repo, args, signal, input)).toString("utf8").replace(/\r\n/g, "\n");
  }
  async source(repo, hash, signal) {
    if (!HASH.test(hash)) throw new Error("\u8BF7\u9009\u62E9\u6709\u6548\u7684\u63D0\u4EA4\u54C8\u5E0C");
    const root = await realpath((await this.git(repo, ["rev-parse", "--show-toplevel"], signal)).trim());
    return { repo: root, hash: (await this.git(root, ["rev-parse", "--verify", hash + "^{commit}"], signal)).trim() };
  }
  async repoKey(repo) {
    const common = (await this.git(repo, ["rev-parse", "--git-common-dir"])).trim();
    const key = await realpath(path.resolve(repo, common));
    return process.platform === "win32" ? key.toLowerCase() : key;
  }
  async exclusive(operation) {
    const result = this.mutations.then(operation);
    this.mutations = result.then(() => {
    }, () => {
    });
    return result;
  }
  /** Read branch/tag references and their commit attachment map. */
  async references(repo, signal) {
    const text2 = await this.git(repo, ["for-each-ref", "--format=%(objectname)|%(*objectname)|%(refname)|%(objecttype)|%(creatordate:iso-strict)"], signal);
    const refs = [], commit_refs = {};
    for (const line of text2.trim().split("\n")) {
      const [obj, peeled, full, type, date] = line.split("|");
      if (!full) continue;
      const kind = full.startsWith("refs/heads/") ? "branch" : full.startsWith("refs/tags/") ? "tag" : full.startsWith("refs/remotes/") ? "remote" : null;
      if (!kind) continue;
      const name2 = full.replace(/^refs\/(heads|tags|remotes)\//, "");
      if (kind === "remote" && name2.endsWith("/HEAD")) continue;
      refs.push({ name: name2, kind, type, date });
      (commit_refs[peeled || obj] ??= []).push({ name: name2, kind });
    }
    return { refs, commit_refs };
  }
  /** Read all user-visible history without internal automation/ownership refs. */
  async graph(repo, signal) {
    const root = await realpath(repo);
    const format = ["%H", "%P", "%an", "%ae", "%aI", "%s", "%b"].join("%x1f") + "%x1e";
    const text2 = await this.git(root, ["log", "--exclude=refs/codex/*", "--exclude=refs/git-tree-viz/*", "--all", "--date-order", "--pretty=format:" + format], signal);
    const { refs, commit_refs } = await this.references(root, signal);
    const commits = [];
    for (const record of text2.split("")) {
      const p = record.replace(/^\n+/, "").split("");
      if (p.length < 7) continue;
      commits.push({ hash: p[0], parents: p[1].split(" ").filter(Boolean), author: p[2], email: p[3], date: p[4], subject: p[5], body: p.slice(6).join("").trim(), refs: commit_refs[p[0]] || [] });
    }
    const head = (await this.git(root, ["symbolic-ref", "--quiet", "--short", "HEAD"], signal).catch(() => Promise.resolve(""))).trim();
    const head_hash = commits.length ? (await this.git(root, ["rev-parse", "HEAD"], signal).catch(() => Promise.resolve(""))).trim() : "";
    const main = refs.find((r) => r.kind === "branch" && r.name === "main") || refs.find((r) => r.kind === "branch" && r.name === "master") || refs.find((r) => r.kind === "branch" && r.name === head);
    const main_hash = commits.find((c) => main && c.refs.some((r) => r.kind === "branch" && r.name === main.name))?.hash || head_hash;
    const dates = commits.map((c) => c.date).sort();
    return { repo: root, head, head_hash, main_hash, main_branch: main?.name || head, refs, commits, owned_tags: await this.ownedTags(root), stats: { commits: commits.length, branches: refs.filter((r) => r.kind === "branch").length, tags: refs.filter((r) => r.kind === "tag").length, merges: commits.filter((c) => c.parents.length > 1).length, roots: commits.filter((c) => !c.parents.length).length, first_date: dates[0] || "", last_date: dates.at(-1) || "" } };
  }
  /** Batch text/file changes, including roots and merges against their first parent. */
  async metrics(repo, signal) {
    const text2 = await this.git(repo, ["log", "--exclude=refs/codex/*", "--exclude=refs/git-tree-viz/*", "--all", "--root", "--diff-merges=first-parent", "--no-renames", "--no-ext-diff", "--no-textconv", "--numstat", "-z", "--format=%x1e%H%x00"], signal);
    const result = {};
    for (const record of text2.split("")) {
      const end = record.indexOf("\0");
      if (end < 0) continue;
      const hash = record.slice(0, end).trim();
      if (!HASH.test(hash)) continue;
      const metric = { additions: 0, deletions: 0, files: 0, edits: 0 };
      for (const entry of record.slice(end + 1).split("\0")) {
        const fields = entry.replace(/^\n+/, "").split("	");
        if (fields.length < 3) continue;
        metric.files++;
        metric.additions += fields[0] === "-" ? 0 : Number(fields[0]);
        metric.deletions += fields[1] === "-" ? 0 : Number(fields[1]);
      }
      metric.edits = metric.additions + metric.deletions;
      result[hash] = metric;
    }
    return result;
  }
  /** Read changed files and a bounded textual patch relative to one parent. */
  async detail(repo, hash, parent = 0, file = "", signal) {
    const source = await this.source(repo, hash, signal);
    const parents = (await this.git(source.repo, ["show", "-s", "--format=%P", source.hash], signal)).trim().split(" ").filter(Boolean);
    if (!Number.isInteger(parent) || parent < 0 || parent >= Math.max(1, parents.length)) throw new Error("\u7236\u63D0\u4EA4\u4E0D\u5B58\u5728");
    const base = parents[parent] || "";
    const diff = base ? ["diff", base, source.hash] : ["diff-tree", "--root", "--no-commit-id", "-r", source.hash];
    const common = ["--no-ext-diff", "--no-textconv", "--no-renames"];
    const nums = await this.git(source.repo, [...diff, ...common, "--numstat", "-z"], signal);
    const statusText = await this.git(source.repo, [...diff, ...common, "--name-status", "-z"], signal);
    const status = statusText.split("\0");
    const statuses = /* @__PURE__ */ new Map();
    for (let i = 0; i + 1 < status.length; i += 2) statuses.set(status[i + 1], status[i]);
    const files = nums.split("\0").filter(Boolean).map((record) => {
      const a = record.indexOf("	"), b = record.indexOf("	", a + 1);
      const added = record.slice(0, a), deleted = record.slice(a + 1, b), name2 = record.slice(b + 1);
      return { path: name2, status: statuses.get(name2) || "M", additions: added === "-" ? null : Number(added), deletions: deleted === "-" ? null : Number(deleted) };
    });
    if (file && !files.some((f) => f.path === file)) throw new Error("\u6587\u4EF6\u4E0D\u5728\u672C\u6B21\u53D8\u66F4\u4E2D");
    const patch = await this.git(source.repo, ["--literal-pathspecs", ...diff, ...common, "--patch", "--no-color", "--", ...file ? [file] : []], signal);
    return { hash: source.hash, parents, base, files, patch: patch.slice(0, this.config.maxPatchCharacters), truncated: patch.length > this.config.maxPatchCharacters, path: file };
  }
  async tree(repo, hash, signal) {
    const text2 = await this.git(repo, ["ls-tree", "-r", "-z", "--full-tree", hash], signal);
    return text2.split("\0").filter(Boolean).map((record) => {
      const tab = record.indexOf("	");
      const [mode, , object2] = record.slice(0, tab).split(" ");
      return { mode, object: object2, path: record.slice(tab + 1) };
    });
  }
  /** Identify submodules, LFS rules and symlinks before an export is accepted. */
  async exportInfo(repo, hash, signal) {
    const source = await this.source(repo, hash, signal);
    const entries = await this.tree(source.repo, source.hash, signal);
    const submodules = entries.filter((e) => e.mode === "160000").map((e) => e.path);
    let lfs = false;
    for (const entry of entries) if (path.posix.basename(entry.path) === ".gitattributes" && entry.mode !== "120000") lfs ||= (await this.git(source.repo, ["show", source.hash + ":" + entry.path], signal)).includes("filter=lfs");
    const symlinks = entries.filter((e) => e.mode === "120000").length;
    const warnings = [];
    if (submodules.length) warnings.push(`\u5305\u542B ${submodules.length} \u4E2A\u5B50\u6A21\u5757\uFF1A\u4EC5\u521B\u5EFA\u7A7A\u76EE\u5F55\uFF0C\u4E0D\u4E0B\u8F7D\u5B50\u6A21\u5757\u5185\u5BB9\u3002`);
    if (lfs) warnings.push("\u6B64\u7248\u672C\u5305\u542B Git LFS \u89C4\u5219\uFF1A\u4FDD\u7559\u5DF2\u63D0\u4EA4\u7684\u6307\u9488\u6587\u4EF6\uFF0C\u4E0D\u4E0B\u8F7D LFS \u5927\u6587\u4EF6\u3002");
    if (symlinks && process.platform === "win32") warnings.push("\u6B64\u7248\u672C\u5305\u542B\u7B26\u53F7\u94FE\u63A5\uFF1AWindows \u4E0D\u5141\u8BB8\u521B\u5EFA\u94FE\u63A5\u65F6\uFF0C\u4F1A\u4FDD\u7559\u94FE\u63A5\u76EE\u6807\u6587\u672C\u3002");
    return { ...source, files: entries.filter((e) => e.mode !== "160000").length, submodules, lfs, symlinks, warnings };
  }
  async destination(source, destination) {
    if (!destination || !path.isAbsolute(destination)) throw new Error("\u8BF7\u8F93\u5165\u76EE\u6807\u6587\u4EF6\u5939\u7684\u7EDD\u5BF9\u8DEF\u5F84");
    if (await exists(destination)) {
      const stat = await lstat(destination);
      if (stat.isSymbolicLink()) throw new Error("\u76EE\u6807\u4E0D\u80FD\u662F\u7B26\u53F7\u94FE\u63A5\u6216\u76EE\u5F55\u8054\u63A5");
      if (!stat.isDirectory() || (await readdir(destination)).length) throw new Error("\u76EE\u6807\u6587\u4EF6\u5939\u5FC5\u987B\u4E0D\u5B58\u5728\u6216\u4E3A\u7A7A\uFF0C\u4E0D\u4F1A\u8986\u76D6\u5DF2\u6709\u6587\u4EF6");
    }
    const parent = await realpath(path.dirname(destination));
    const resolved = path.join(parent, path.basename(destination));
    if (inside(source, resolved)) throw new Error("\u8BF7\u4F7F\u7528\u6E90\u4ED3\u5E93\u4E4B\u5916\u7684\u76EE\u6807\u6587\u4EF6\u5939");
    return resolved;
  }
  async snapshot(repo, hash, target) {
    const entries = (await this.tree(repo, hash)).sort((a, b) => Number(a.mode === "120000") - Number(b.mode === "120000"));
    const child = spawn("git", ["-C", repo, "cat-file", "--batch"], { windowsHide: true, stdio: ["pipe", "pipe", "pipe"] });
    this.children.add(child);
    const reader = new ByteReader(child.stdout);
    let processError;
    const errors = [];
    child.on("error", (error) => {
      processError = error;
    });
    child.stdin.on("error", (error) => {
      processError = error;
    });
    child.stderr.on("data", (b) => errors.push(b));
    const done = new Promise((resolve, reject) => child.on("close", (code) => {
      this.children.delete(child);
      if (processError) reject(processError);
      else if (code) reject(new Error(Buffer.concat(errors).toString("utf8") || "Git blob read failed"));
      else resolve();
    }));
    void done.catch(() => {
    });
    const timer = setTimeout(() => child.kill(), this.config.gitTimeoutMs);
    try {
      for (const entry of entries) {
        const segments = entry.path.split("/");
        if (segments.some((p) => !p || p === "." || p === ".." || p.toLowerCase() === ".git")) throw new Error("\u63D0\u4EA4\u5305\u542B\u4E0D\u80FD\u5B89\u5168\u5BFC\u51FA\u7684\u6587\u4EF6\u8DEF\u5F84");
        if (process.platform === "win32" && (/[\\:]/.test(entry.path) || segments.some((p) => /[. ]$/.test(p) || /^(con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(p)))) throw new Error("\u63D0\u4EA4\u5305\u542B Windows \u4E0D\u652F\u6301\u7684\u6587\u4EF6\u8DEF\u5F84\uFF1A" + entry.path);
        const file = path.resolve(target, ...segments);
        if (!inside(target, file)) throw new Error("\u63D0\u4EA4\u6587\u4EF6\u8DEF\u5F84\u8D85\u51FA\u76EE\u6807\u76EE\u5F55");
        if (entry.mode === "160000") {
          await mkdir(file, { recursive: true });
          continue;
        }
        await mkdir(path.dirname(file), { recursive: true });
        child.stdin.write(entry.object + "\n");
        const header = (await reader.line()).split(" ");
        if (header[1] !== "blob") throw new Error("\u65E0\u6CD5\u8BFB\u53D6\u63D0\u4EA4\u6587\u4EF6\uFF1A" + entry.path);
        let remaining = Number(header[2]);
        if (!Number.isSafeInteger(remaining) || remaining < 0) throw new Error("Git \u6587\u4EF6\u6D41\u683C\u5F0F\u9519\u8BEF");
        if (entry.mode === "120000") {
          const bytes = await reader.read(remaining);
          const link = bytes.toString("utf8");
          if (path.isAbsolute(link) || !inside(target, path.resolve(path.dirname(file), link))) throw new Error("\u7B26\u53F7\u94FE\u63A5\u6307\u5411\u5BFC\u51FA\u76EE\u5F55\u4E4B\u5916\uFF1A" + entry.path);
          try {
            await symlink(link, file);
          } catch (error) {
            if (process.platform !== "win32") throw error;
            await writeFile(file, bytes);
          }
        } else {
          const output = await open(file, "wx");
          try {
            while (remaining) {
              const chunk = await reader.read(Math.min(remaining, 1024 * 1024));
              await output.writeFile(chunk);
              remaining -= chunk.length;
            }
          } finally {
            await output.close();
          }
          if (entry.mode === "100755" && process.platform !== "win32") await chmod(file, 493);
        }
        if ((await reader.read(1))[0] !== 10) throw new Error("Git \u6587\u4EF6\u6D41\u683C\u5F0F\u9519\u8BEF");
      }
      child.stdin.end();
      await done;
    } catch (error) {
      child.kill();
      await done.catch(() => {
      });
      throw error;
    } finally {
      clearTimeout(timer);
    }
  }
  /** Export committed state into a staged, empty-or-new sibling destination. */
  async export(repo, hash, destination, includeGit, branch) {
    const info = await this.exportInfo(repo, hash);
    const target = await this.destination(info.repo, destination);
    branch = branch.trim();
    if (branch) {
      if (!includeGit) throw new Error("\u4EC5\u5E26 Git \u4ED3\u5E93\u6A21\u5F0F\u652F\u6301\u521B\u5EFA\u5206\u652F");
      await this.git(info.repo, ["check-ref-format", "--branch", branch]);
    }
    const parent = path.dirname(target);
    const stage = await mkdtemp(path.join(parent, ".git-tree-export-"));
    try {
      if (includeGit) {
        await this.git(info.repo, ["clone", "--no-checkout", "--no-hardlinks", "--dissociate", "--", info.repo, stage]);
        await this.git(stage, ["-c", "core.hooksPath=" + path.join(stage, ".git", "export-no-hooks"), "-c", "filter.lfs.required=false", "-c", "filter.lfs.smudge=", "-c", "filter.lfs.process=", "checkout", ...branch ? ["-b", branch] : ["--detach"], info.hash]);
      } else await this.snapshot(info.repo, info.hash, stage);
      await this.exclusive(async () => {
        await this.destination(info.repo, target);
        if (await exists(target)) await rmdir(target);
        await rename(stage, target);
        this.exports.add(target);
      });
      return { path: target, hash: info.hash, include_git: includeGit, branch: includeGit ? branch : "", files: info.files, warnings: info.warnings };
    } finally {
      if (path.dirname(stage) !== parent || !path.basename(stage).startsWith(".git-tree-export-")) throw new Error("Invalid export staging path");
      await rm(stage, { recursive: true, force: true });
    }
  }
  /** Open only a canonical directory successfully exported by this engine instance. */
  async openExport(folder) {
    const canonical = await realpath(folder);
    if (!this.exports.has(canonical)) throw new Error("\u53EA\u80FD\u6253\u5F00\u672C\u6B21\u670D\u52A1\u6210\u529F\u5BFC\u51FA\u7684\u6587\u4EF6\u5939");
    const command = process.platform === "win32" ? "explorer.exe" : process.platform === "darwin" ? "open" : "xdg-open";
    await new Promise((resolve, reject) => {
      const child = spawn(command, [canonical], { windowsHide: true, detached: true, stdio: "ignore" });
      child.once("error", reject);
      child.once("spawn", () => {
        child.unref();
        resolve();
      });
    });
    return { path: canonical };
  }
  /** Grant/revoke one owner Peer capability for one Git common directory. */
  async writeAccess(repo, enabled, token, owner) {
    return this.exclusive(async () => {
      const key = await this.repoKey(repo);
      if (enabled) {
        const grant = randomUUID();
        this.grants.set(grant, { repo: key, owner });
        return { enabled: true, token: grant };
      }
      if (this.grants.get(token)?.owner === owner && this.grants.get(token)?.repo === key) this.grants.delete(token);
      return { enabled: false, token: "" };
    });
  }
  async requireWrite(repo, token, owner) {
    const grant = this.grants.get(token);
    if (!grant || grant.owner !== owner || grant.repo !== await this.repoKey(repo)) throw new Error("\u6E90\u4ED3\u5E93\u5F53\u524D\u4E3A\u53EA\u8BFB\uFF0C\u8BF7\u5148\u5728\u53F3\u4E0A\u89D2\u5F00\u542F\u8BFB\u5199\u6A21\u5F0F");
  }
  /** Ownership survives view and plugin reloads through private Git refs. */
  async ownedTags(repo) {
    const tags = (await this.git(repo, ["for-each-ref", "--format=%(refname)%00%(objectname)", "refs/tags/"])).trim().split("\n").filter(Boolean);
    const actual = new Map(tags.map((line) => line.split("\0")));
    const markers = (await this.git(repo, ["for-each-ref", "--format=%(refname)%00%(objectname)", MARKERS])).trim().split("\n").filter(Boolean);
    return markers.map((line) => {
      const [ref, hash] = line.split("\0"), name2 = ref.slice(MARKERS.length), current = actual.get("refs/tags/" + name2);
      return { name: name2, hash, status: current === void 0 ? "missing" : current === hash ? "unchanged" : "changed" };
    });
  }
  async transaction(repo, commands) {
    if (commands.length) await this.git(repo, ["update-ref", "--no-deref", "--stdin"], void 0, "start\n" + commands.join("\n") + "\nprepare\ncommit\n");
  }
  async tagState(repo) {
    return { ...await this.references(repo), owned_tags: await this.ownedTags(repo) };
  }
  /** Atomically create a new local lightweight tag and its app-ownership marker. */
  async createTag(repo, hash, name2, token, owner) {
    return this.exclusive(async () => {
      await this.requireWrite(repo, token, owner);
      name2 = name2.trim();
      if (!name2 || name2.startsWith("-") || name2.startsWith("refs/") || name2 === "HEAD") throw new Error("\u8BF7\u8F93\u5165\u6807\u7B7E\u77ED\u540D\u79F0\uFF0C\u4F8B\u5982 v1.0 \u6216 review/important");
      const source = await this.source(repo, hash);
      await this.git(source.repo, ["check-ref-format", "refs/tags/" + name2]);
      await this.transaction(source.repo, [`create ${JSON.stringify("refs/tags/" + name2)} ${source.hash}`, `create ${JSON.stringify(MARKERS + name2)} ${source.hash}`]);
      return { name: name2, hash: source.hash, ...await this.tagState(source.repo) };
    });
  }
  /** Revert all unchanged app-created tags, preserving manual and subsequently moved tags. */
  async undoTags(repo, token, owner) {
    return this.exclusive(async () => {
      await this.requireWrite(repo, token, owner);
      const owned = await this.ownedTags(repo);
      const removed = [], skipped = [], missing = [], commands = [];
      for (const tag of owned) {
        if (tag.status === "changed") {
          skipped.push(tag.name);
          continue;
        }
        if (tag.status === "unchanged") {
          commands.push(`delete ${JSON.stringify("refs/tags/" + tag.name)} ${tag.hash}`);
          removed.push(tag.name);
        } else missing.push(tag.name);
        commands.push(`delete ${JSON.stringify(MARKERS + tag.name)} ${tag.hash}`);
      }
      await this.transaction(repo, commands);
      return { removed, skipped, missing, ...await this.tagState(repo) };
    });
  }
  /** Revoke grants and stop outstanding reads after accepted mutations have settled. */
  async dispose() {
    await this.mutations;
    this.disposed = true;
    this.grants.clear();
    await Promise.all([...this.children].map((child) => new Promise((resolve) => {
      child.once("close", () => resolve());
      child.kill();
    })));
    this.exports.clear();
  }
};

// src/index.ts
var name = "git-tree-viz";
var inject = ["connection", "webServer"];
var CHANNEL = "/git-tree-viz";
var MUTATIONS = /* @__PURE__ */ new Set(["export", "open-folder", "write-access", "tags/create", "tags/undo-all"]);
function object(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("\u8BF7\u6C42\u683C\u5F0F\u65E0\u6548");
  return value;
}
function text(value, key, fallback) {
  if (value === void 0 && fallback !== void 0) return fallback;
  if (typeof value !== "string") throw new Error(`Invalid ${key}: expected a string`);
  return value;
}
function bool(value, key, fallback = false) {
  if (value === void 0) return fallback;
  if (typeof value !== "boolean") throw new Error(`Invalid ${key}: expected a boolean`);
  return value;
}
function integer(value, key, fallback = 0) {
  if (value === void 0) return fallback;
  if (typeof value !== "number" || !Number.isSafeInteger(value)) throw new Error(`Invalid ${key}: expected an integer`);
  return value;
}
function createDispatcher(engine) {
  const owners = /* @__PURE__ */ new WeakMap();
  return async (endpoint, payload, signal, peer) => {
    if (peer.principal.kind !== "owner") return { ok: false, error: { code: "git-tree/forbidden", message: "Git Tree is available only to the authenticated owner.", details: {} } };
    let owner = owners.get(peer);
    if (!owner) {
      owner = randomUUID2();
      owners.set(peer, owner);
    }
    try {
      signal.throwIfAborted();
      const input = object(payload);
      const repo = endpoint === "open-folder" ? "" : text(input.repo, "repo");
      let value;
      switch (endpoint) {
        case "graph":
          value = await engine.graph(repo, signal);
          break;
        case "metrics":
          value = await engine.metrics(repo, signal);
          break;
        case "commit":
          value = await engine.detail(repo, text(input.hash, "hash"), integer(input.parent, "parent"), text(input.path, "path", ""), signal);
          break;
        case "export-info":
          value = await engine.exportInfo(repo, text(input.hash, "hash"), signal);
          break;
        case "export":
          value = await engine.export(repo, text(input.hash, "hash"), text(input.destination, "destination"), bool(input.include_git, "include_git"), text(input.branch, "branch", ""));
          break;
        case "open-folder":
          value = await engine.openExport(text(input.path, "path"));
          break;
        case "write-access":
          value = await engine.writeAccess(repo, bool(input.enabled, "enabled"), text(input.token, "token", ""), owner);
          break;
        case "tags/create":
          value = await engine.createTag(repo, text(input.hash, "hash"), text(input.name, "name"), text(input.token, "token", ""), owner);
          break;
        case "tags/undo-all":
          value = await engine.undoTags(repo, text(input.token, "token", ""), owner);
          break;
        default:
          throw new Error("\u63A5\u53E3\u4E0D\u5B58\u5728");
      }
      return { ok: true, value };
    } catch (error) {
      return { ok: false, error: { code: signal.aborted ? "git-tree/cancelled" : "git-tree/operation-failed", message: error instanceof Error ? error.message : String(error), details: { endpoint } } };
    }
  };
}
function apply(ctx, input = {}) {
  const engine = new GitEngine(resolveConfig(input));
  const dispatch = createDispatcher(engine);
  const writes = /* @__PURE__ */ new Set();
  let active = true;
  ctx.effect(() => {
    const invoke = (endpoint, payload, signal, peer) => {
      if (!active) return Promise.resolve({ ok: false, error: { code: "git-tree/stopped", message: "Git Tree plugin is stopped", details: {} } });
      const operation = dispatch(endpoint, payload, signal, peer);
      if (MUTATIONS.has(endpoint)) {
        writes.add(operation);
        void operation.finally(() => writes.delete(operation));
      }
      return operation;
    };
    const respond = async (request) => {
      const admitted = ctx.connection.admit({ headers: request.headers });
      if ("rejection" in admitted) return new Response("unauthorized", { status: admitted.rejection });
      if (admitted.peer.principal.kind !== "owner") return new Response("forbidden", { status: 403 });
      if (request.method !== "POST" || request.headers.get("content-type")?.split(";")[0].trim() !== "application/json") return new Response("JSON POST required", { status: 400 });
      let message;
      try {
        const reader = request.body?.getReader();
        if (!reader) throw new Error("Empty request");
        const chunks = [];
        let size = 0;
        while (true) {
          const next = await reader.read();
          if (next.done) break;
          size += next.value.length;
          if (size > 16384) {
            await reader.cancel();
            throw new Error("Request too large");
          }
          chunks.push(next.value);
        }
        message = object(JSON.parse(Buffer.concat(chunks).toString("utf8")));
        if (message.type !== "client-request" || typeof message.rpcId !== "string" || !message.rpcId || typeof message.method !== "string" || !/^\/[A-Za-z0-9_$.-]+(?:\/[A-Za-z0-9_$.-]+)*$/.test("/" + message.method) || new URL(request.url).pathname !== CHANNEL + "/" + message.method) throw new Error("Invalid RPC envelope");
      } catch (error) {
        return new Response(error instanceof Error ? error.message : String(error), { status: 400 });
      }
      const result = await invoke(message.method, message.payload, request.signal, admitted.peer);
      return Response.json({ type: "server-response", rpcId: message.rpcId, result });
    };
    const unregister = ctx.webServer.register({ kind: "prefix", path: CHANNEL, handler: async (req, res) => {
      const abort = new AbortController();
      const cancel = () => abort.abort();
      req.once("aborted", cancel);
      res.once("close", cancel);
      try {
        const headers = new Headers();
        for (const [key, value] of Object.entries(req.headers)) if (value !== void 0) headers.set(key, Array.isArray(value) ? value.join(", ") : value);
        const admission = ctx.connection.admit({ headers });
        if ("rejection" in admission) {
          res.writeHead(admission.rejection);
          res.end("unauthorized");
          return;
        }
        const chunks = [];
        let size = 0;
        for await (const chunk of req) {
          size += chunk.length;
          if (size > 16384) {
            res.writeHead(413);
            res.end("Request too large");
            return;
          }
          chunks.push(Buffer.from(chunk));
        }
        const method = req.method ?? "GET";
        const request = new Request("http://localhost" + req.url, { method, headers, signal: abort.signal, ...method === "GET" || method === "HEAD" ? {} : { body: Buffer.concat(chunks) } });
        const response = await respond(request);
        res.writeHead(response.status, Object.fromEntries(response.headers));
        res.end(Buffer.from(await response.arrayBuffer()));
      } catch (error) {
        if (!res.headersSent) res.writeHead(400);
        res.end(error instanceof Error ? error.message : "Invalid request");
      } finally {
        req.off("aborted", cancel);
        res.off("close", cancel);
      }
    } });
    return async () => {
      active = false;
      await unregister();
      await Promise.allSettled([...writes]);
      await engine.dispose();
    };
  }, "git-tree-viz: authenticated channel and Git lifecycle");
}
export {
  CHANNEL,
  apply,
  createDispatcher,
  inject,
  name
};
