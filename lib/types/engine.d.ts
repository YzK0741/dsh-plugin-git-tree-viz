import type { Commit, GitRef, GitTreeConfig, Metrics, OwnedTag, ExportInfo } from './types.ts';
/** Resolve deployment settings once and reject invalid values at plugin activation. */
export declare function resolveConfig(input?: Partial<GitTreeConfig>): GitTreeConfig;
/** Lifecycle-owned engine, write capabilities, serial tag transactions and completed exports. */
export declare class GitEngine {
    readonly config: GitTreeConfig;
    private readonly children;
    private readonly grants;
    private readonly exports;
    private mutations;
    private disposed;
    constructor(config: GitTreeConfig);
    private command;
    private git;
    private source;
    private repoKey;
    private exclusive;
    /** Read branch/tag references and their commit attachment map. */
    references(repo: string, signal?: AbortSignal): Promise<{
        refs: GitRef[];
        commit_refs: Record<string, GitRef[]>;
    }>;
    /** Read all user-visible history without internal automation/ownership refs. */
    graph(repo: string, signal?: AbortSignal): Promise<{
        repo: string;
        head: string;
        head_hash: string;
        main_hash: string;
        main_branch: string;
        refs: GitRef[];
        commits: Commit[];
        owned_tags: OwnedTag[];
        stats: {
            commits: number;
            branches: number;
            tags: number;
            merges: number;
            roots: number;
            first_date: string;
            last_date: string;
        };
    }>;
    /** Batch text/file changes, including roots and merges against their first parent. */
    metrics(repo: string, signal?: AbortSignal): Promise<Record<string, Metrics>>;
    /** Read changed files and a bounded textual patch relative to one parent. */
    detail(repo: string, hash: string, parent?: number, file?: string, signal?: AbortSignal): Promise<{
        hash: string;
        parents: string[];
        base: string;
        files: {
            path: string;
            status: string;
            additions: number | null;
            deletions: number | null;
        }[];
        patch: string;
        truncated: boolean;
        path: string;
    }>;
    private tree;
    /** Identify submodules, LFS rules and symlinks before an export is accepted. */
    exportInfo(repo: string, hash: string, signal?: AbortSignal): Promise<ExportInfo>;
    private destination;
    private snapshot;
    /** Export committed state into a staged, empty-or-new sibling destination. */
    export(repo: string, hash: string, destination: string, includeGit: boolean, branch: string): Promise<{
        path: string;
        hash: string;
        include_git: boolean;
        branch: string;
        files: number;
        warnings: string[];
    }>;
    /** Open only a canonical directory successfully exported by this engine instance. */
    openExport(folder: string): Promise<{
        path: string;
    }>;
    /** Grant/revoke one owner Peer capability for one Git common directory. */
    writeAccess(repo: string, enabled: boolean, token: string, owner: string): Promise<{
        enabled: boolean;
        token: string;
    }>;
    private requireWrite;
    /** Ownership survives view and plugin reloads through private Git refs. */
    ownedTags(repo: string): Promise<OwnedTag[]>;
    private transaction;
    private tagState;
    /** Atomically create a new local lightweight tag and its app-ownership marker. */
    createTag(repo: string, hash: string, name: string, token: string, owner: string): Promise<{
        owned_tags: OwnedTag[];
        refs: GitRef[];
        commit_refs: Record<string, GitRef[]>;
        name: string;
        hash: string;
    }>;
    /** Revert all unchanged app-created tags, preserving manual and subsequently moved tags. */
    undoTags(repo: string, token: string, owner: string): Promise<{
        owned_tags: OwnedTag[];
        refs: GitRef[];
        commit_refs: Record<string, GitRef[]>;
        removed: string[];
        skipped: string[];
        missing: string[];
    }>;
    /** Revoke grants and stop outstanding reads after accepted mutations have settled. */
    dispose(): Promise<void>;
}
