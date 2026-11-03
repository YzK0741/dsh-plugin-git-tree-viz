window.__ModuleLoader__.load({id:"dsh-plugin-git-tree-viz",factory:function(require){var module={exports:{}};var exports=module.exports;
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client/index.tsx
var index_exports = {};
__export(index_exports, {
  GitTreeIcon: () => GitTreeIcon,
  GitTreePanel: () => GitTreePanel,
  apply: () => apply,
  inject: () => inject,
  name: () => name
});
module.exports = __toCommonJS(index_exports);
var import_react = __toESM(require("react"), 1);

// native-view:git-tree-ui
function mountGitTree(root, bridge) {
  root.innerHTML = '<style>:host{--bg:#101316;--panel:#15191d;--raised:#1c2227;--border:#2a3036;--text:#e5e9ec;--muted:#8b969e;--accent:#a5d9bb;--mono:Consolas,"Cascadia Code",monospace;--detail:clamp(400px,42vw,660px)}\n*{box-sizing:border-box}:host{height:100%}#git-tree-root{margin:0;background:var(--bg);color:var(--text);font:13px "Segoe UI","Microsoft YaHei",sans-serif;overflow:hidden}button,input,select{font:inherit}button,a,input,select{-webkit-tap-highlight-color:transparent}button{cursor:pointer;white-space:nowrap}button:disabled{opacity:.45;cursor:wait}button:focus-visible,a:focus-visible,select:focus-visible{outline:2px solid var(--accent);outline-offset:3px}input:focus{outline:none}button{border:1px solid var(--border);border-radius:7px;background:var(--raised);color:var(--text);padding:8px 12px}button:hover{background:#293139}button:active{transform:translateY(1px)}a{color:var(--accent);text-decoration:none}#app{height:100%;display:flex;flex-direction:column}#topbar{height:78px;flex-shrink:0;padding:0 30px;display:flex;align-items:center;gap:28px;border-bottom:1px solid var(--border);background:var(--panel)}.brand{display:flex;align-items:center;gap:12px;color:var(--text);font-size:20px;font-weight:650;letter-spacing:-.5px;white-space:nowrap}.brand-icon{width:38px;height:38px;display:grid;place-items:center;border:1px solid #3d5149;background:#20312a;color:var(--accent);border-radius:10px;font-size:32px;font-weight:400}.brand small{display:block;font-size:8px;color:var(--muted);letter-spacing:1.4px;margin-top:4px;font-weight:500}.pathbox{display:flex;align-items:center;gap:10px;flex:1;max-width:760px;margin-left:auto;background:var(--bg);border:1px solid var(--border);padding:5px 5px 5px 12px;border-radius:9px}.pathbox:focus-within{border-color:#779a89}.pathbox label{color:var(--muted);font-size:11px;padding-right:10px;border-right:1px solid var(--border)}#repoInput{flex:1;width:0;background:none;border:0;color:var(--text);font:11px var(--mono);padding:4px}#loadBtn{background:var(--accent);border-color:var(--accent);color:#14241d;font-weight:600}#loadBtn:hover{background:#bde9ce}#loadBtn span{margin-left:10px}.local-badge{font-size:11px;color:var(--muted);white-space:nowrap}.local-badge i,.live-dot{display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--accent);margin-right:7px}.overview{display:flex;justify-content:space-between;align-items:center;padding:26px 32px 24px;gap:20px}.eyebrow{font:9px var(--mono);letter-spacing:2px;color:var(--muted)}h1{font-size:25px;letter-spacing:-.6px;margin:7px 0 5px;font-weight:600}#repoMeta{color:var(--muted);font-size:11px}.stats{display:flex;gap:34px}.stat{min-width:54px}.stat b{display:block;font:24px var(--mono);letter-spacing:-1px}.stat span{display:block;font-size:10px;color:var(--muted);margin-top:6px}.toolbar{display:flex;align-items:center;gap:12px;padding:13px 30px;border-top:1px solid var(--border);border-bottom:1px solid var(--border);background:#14181b}.history-title{font-weight:600;margin-right:auto;white-space:nowrap}.count{font:10px var(--mono);color:var(--muted);background:var(--raised);border:1px solid var(--border);padding:2px 6px;border-radius:5px;margin-left:7px}.searchbox{display:flex;align-items:center;gap:8px;border:1px solid var(--border);border-radius:7px;padding:0 7px 0 10px;background:var(--bg);width:320px;color:var(--muted)}.searchbox:focus-within{border-color:#779a89}.searchbox>span:first-child{font-size:22px}#searchInput{background:transparent;border:0;padding:8px 0;min-width:0;flex:1;color:var(--text);font-size:11px}#searchCount{font:10px var(--mono);white-space:nowrap}.icon-button{border:0;background:none;padding:3px 7px;font-size:20px;line-height:24px;color:var(--muted);border-radius:5px}.quiet-button{font-size:11px;background:transparent}#stage{flex:1;min-height:0;display:flex;overflow:hidden;position:relative}#history{position:relative;flex:1;min-width:0;display:flex;flex-direction:column}.graph-caption{height:38px;flex-shrink:0;display:flex;justify-content:space-between;align-items:center;padding:0 30px;font:10px var(--mono);color:var(--muted);border-bottom:1px solid #20262b}.graph-caption span:first-child{color:var(--accent)}#scroller{flex:1;min-height:0;overflow:auto;position:relative;background-image:radial-gradient(#30373c 0.6px,transparent 0.6px);background-size:20px 20px;outline:none;scrollbar-gutter:stable}#graph{display:block;position:relative;transition:left .32s cubic-bezier(.22,.68,0,1);overflow:visible}#graph text{user-select:none}#graph .commit-row{cursor:pointer}#graph .commit-row:hover .row-bg{fill:#20292d;fill-opacity:.95}#graph .commit-row.selected .row-bg{fill:#243a30;fill-opacity:.9}#graph .commit-row.matched .row-bg{fill:#3c3927;fill-opacity:.7}#graph .commit-row.selected.matched .row-bg{fill:#294537}.graph-footer{height:34px;flex-shrink:0;border-top:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;padding:0 24px;color:var(--muted);font-size:10px;background:var(--panel);gap:8px}.graph-footer>div{display:flex;align-items:center;gap:8px}.legend-dot,.legend-merge,.legend-root{display:inline-block;width:7px;height:7px;background:var(--accent);border-radius:50%;margin-left:12px}.legend-merge{background:transparent;border:1.5px solid #c5aeed;width:9px;height:9px}.legend-root{border-radius:1px;background:#e2c18c}#detail{width:0;flex:0 0 auto;opacity:0;overflow:hidden;border-left:0 solid var(--border);background:var(--panel);transition:width .32s cubic-bezier(.22,.68,0,1),opacity .24s;display:flex;flex-direction:column}.detail-open #detail{width:var(--detail);opacity:1;border-left-width:1px}.detail-top{height:46px;min-height:46px;display:flex;align-items:center;justify-content:space-between;margin:0 22px;border-bottom:1px solid var(--border);font:9px var(--mono);letter-spacing:1.5px;color:var(--muted)}#detailIndex{letter-spacing:0;margin-left:8px;color:#aab4ba}#detailContent{overflow:auto;padding:22px;min-width:calc(var(--detail) - 1px);flex:1}.commit-kind{font:9px var(--mono);letter-spacing:1.5px;color:var(--accent);margin-bottom:10px}#detail h2{font-size:19px;line-height:1.55;font-weight:600;margin:0 0 14px;overflow-wrap:anywhere}.ref-list{display:flex;flex-wrap:wrap;gap:6px;margin:12px 0}.ref-pill{font:10px var(--mono);padding:4px 7px;border:1px solid #3b5146;color:var(--accent);background:#203027;border-radius:5px}.ref-pill.tag{color:#e2c18c;border-color:#5a4c31;background:#302a1f}.ref-pill.remote{color:#a6b4ca;border-color:#3a4756;background:#232b35}.hash-button{font:11px var(--mono);color:var(--accent);padding:7px 9px;background:#1b2621;max-width:100%;overflow:hidden;text-overflow:ellipsis}.hash-button small{font:10px "Segoe UI",sans-serif;margin-left:12px;color:var(--muted)}.meta-grid{display:grid;grid-template-columns:46px 1fr;gap:13px 10px;margin:22px 0;font-size:11px}.meta-grid dt{color:var(--muted)}.meta-grid dd{margin:0;overflow-wrap:anywhere}.meta-grid small{display:block;margin-top:4px;color:var(--muted);font-size:10px}.#git-tree-root{white-space:pre-wrap;line-height:1.8;font-size:12px;border:1px solid var(--border);background:var(--bg);border-radius:8px;padding:13px;overflow-wrap:anywhere}.section-heading{display:flex;align-items:center;justify-content:space-between;font-size:11px;font-weight:600;margin:24px 0 10px}.relation-list{display:flex;flex-wrap:wrap;gap:7px}.relation{font:10px var(--mono);color:#b1bbc2;padding:5px 8px}.section-heading small{font-size:10px;font-weight:400;color:var(--muted)}.comparison{display:flex;align-items:center;gap:8px;color:var(--muted);font-size:10px;margin-bottom:10px}.comparison select{background:var(--raised);border:1px solid var(--border);border-radius:5px;color:var(--text);padding:5px;max-width:100%;font:10px var(--mono)}.change-summary{display:flex;gap:10px;align-items:center;font:11px var(--mono)}.added{color:#9cd5b0}.deleted{color:#e29797}.file-list{border:1px solid var(--border);border-radius:7px;overflow:hidden;max-height:220px;overflow-y:auto}.file-button{display:flex;width:100%;align-items:center;gap:8px;border:0;border-radius:0;background:transparent;padding:9px 10px;text-align:left;font:10px var(--mono);border-bottom:1px solid #242b30}.file-button:last-child{border-bottom:0}.file-button.active{background:#25342d}.file-button .file-path{flex:1;min-width:0;overflow-wrap:anywhere}.file-status{color:var(--muted);width:14px;flex-shrink:0}.file-status.A{color:#9cd5b0}.file-status.D{color:#e29797}.file-nums{font-size:9px;white-space:nowrap}.patch{background:#101417;border:1px solid var(--border);border-radius:7px;overflow:auto;max-height:55vh;margin-top:10px;font:10px/1.8 var(--mono);tab-size:4}.diff-line{white-space:pre;min-height:18px;padding:0 10px;min-width:max-content}.diff-add{background:#183325;color:#b3dfc1}.diff-del{background:#3b2225;color:#efb3b3}.diff-hunk{background:#1a2a35;color:#9cbdd3}.diff-file{color:#bcc7ce;background:#20272d}.muted{color:var(--muted);font-size:11px;line-height:1.8}.loading{padding:22px 0;color:var(--muted);font-size:12px}.error-box{padding:12px;border:1px solid #674045;background:#301f23;border-radius:7px;color:#e6a4a4;font-size:11px;line-height:1.7;overflow-wrap:anywhere}.error-box button{margin-top:10px}.empty-state{position:absolute;top:24%;left:50%;transform:translateX(-50%);text-align:center;width:min(400px,85%);color:var(--muted)}.empty-state>span{font-size:52px;color:var(--accent)}.empty-state h2{font-size:18px;color:var(--text);font-weight:500}.empty-state p{font-size:12px;line-height:1.8;overflow-wrap:anywhere}.status{position:absolute;bottom:46px;left:50%;transform:translateX(-50%);padding:10px 18px;border:1px solid #3e5148;border-radius:9px;background:#22322b;color:#c7e2d2;box-shadow:0 8px 30px #0005;z-index:20;max-width:90vw;font-size:12px}.hidden{display:none!important}::-webkit-scrollbar{width:7px;height:7px}::-webkit-scrollbar-thumb{background:#39434a;border-radius:10px}::-webkit-scrollbar-track{background:transparent}\n@media(min-width:1600px){:host{--detail:600px}}@media(max-width:1000px){#topbar{padding:0 18px;gap:18px}.local-badge{display:none}.overview{padding:20px 22px}.stats{gap:20px}.toolbar{padding:12px 18px}.searchbox{width:250px}:host{--detail:420px}.graph-footer>span{display:none}}@media(max-width:700px){:host{--detail:min(94vw,480px)}#topbar{height:auto;padding:14px;flex-wrap:wrap;gap:14px}.brand{font-size:18px}.brand small{font-size:7px}.pathbox{flex-basis:100%;order:2}.overview{padding:16px}.eyebrow{font-size:8px}h1{font-size:20px}.stats{gap:13px}.stat{min-width:30px}.stat b{font-size:18px}.stat span{font-size:9px}.stat:last-child{display:none}#repoMeta{max-width:42vw;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.toolbar{flex-wrap:wrap;padding:10px 14px;gap:8px}.searchbox{order:3;width:100%}.detail-open #detail{position:absolute;right:0;top:0;bottom:0;box-shadow:-15px 0 40px #0006}#detailContent{min-width:calc(var(--detail) - 1px)}.detail-open #history{opacity:.4}.graph-caption{padding:0 16px}}\n.type-badges{display:flex;flex-wrap:wrap;gap:7px;margin:0 0 15px}.type-badge{display:inline-block;padding:4px 8px;border-radius:5px;color:var(--type-color);background:color-mix(in srgb,var(--type-color) 12%,transparent);border:1px solid color-mix(in srgb,var(--type-color) 32%,transparent);font:10px var(--mono)}.breaking-badge{--type-color:#ec9a95}\n.toolbar{flex-wrap:wrap}.history-title{margin-right:4px}.type-filters{display:flex;align-items:center;gap:5px;flex:1;min-width:220px;overflow-x:auto;padding:3px 1px;scrollbar-width:thin}.filter-chip{flex-shrink:0;padding:5px 8px;background:transparent;border-color:var(--border);color:var(--muted);font:10px var(--mono);border-radius:5px}.filter-chip:hover{color:var(--type-color);background:color-mix(in srgb,var(--type-color) 8%,transparent)}.filter-chip[aria-pressed="true"]{color:var(--type-color);border-color:color-mix(in srgb,var(--type-color) 48%,transparent);background:color-mix(in srgb,var(--type-color) 14%,transparent)}.filter-count{font:10px var(--mono);color:var(--muted);white-space:nowrap}.filter-count:empty{display:none}#graph .commit-row.filter-hit:not(.selected):not(.matched) .row-bg{fill:#21372c;fill-opacity:.6}#graph .commit-row{transition:opacity .16s}\n@media(max-width:1100px){.type-filters{order:4;flex-basis:100%}.history-title{margin-right:auto}.filter-count{order:5}}@media(max-width:700px){.type-filters{order:2}.filter-count{order:2;margin-left:auto}.searchbox{order:3}}\n.sort-control{display:flex;align-items:center;gap:7px;color:var(--muted);font-size:10px;white-space:nowrap}.sort-control select{border:1px solid var(--border);border-radius:6px;background:var(--bg);color:var(--text);padding:7px 23px 7px 8px;font:11px "Segoe UI","Microsoft YaHei",sans-serif;cursor:pointer;max-width:180px}.sort-status{font-size:10px;color:var(--accent);white-space:nowrap}.sort-status:empty{display:none}@media(max-width:700px){.sort-control{order:1}.sort-status{order:1}.type-filters{flex-basis:100%}}\n.export-panel{margin:20px 0;border:1px solid var(--border);border-radius:8px;background:#12191a}.export-panel summary{cursor:pointer;padding:12px;font-size:12px;color:var(--accent)}.export-panel form{padding:0 12px 14px}.export-field{display:flex;flex-direction:column;gap:7px;color:var(--muted);font-size:11px;margin-top:12px}.export-field input{width:100%;min-width:0;border:1px solid var(--border);border-radius:6px;background:var(--bg);color:var(--text);padding:9px;font:11px var(--mono)}.export-field input:focus{border-color:var(--accent)}.export-checkbox{display:flex;align-items:center;gap:8px;font-size:11px;margin-top:15px;cursor:pointer}.export-checkbox input{accent-color:var(--accent)}.export-hint{color:var(--muted);font-size:10px;line-height:1.7;margin:7px 0}.export-notes{font-size:10px;line-height:1.8;margin:14px 0;overflow-wrap:anywhere}.export-notes p{color:#e2bc84;margin:6px 0}.export-submit{background:#a5d9bb;color:#14241d;font-weight:600;font-size:11px}.export-submit:hover{background:#bde9ce}.export-result:not(:empty){margin-top:12px}.export-success{font-size:11px;color:var(--accent);line-height:1.8;overflow-wrap:anywhere}.export-success code{display:block;font:10px/1.7 var(--mono);color:var(--text);margin:6px 0 10px;user-select:all}\n.source-access{display:flex;align-items:center;gap:8px;background:transparent;border-color:transparent;color:var(--muted);font-size:11px;padding:7px 9px;flex-shrink:0}.source-access i{width:6px;height:6px;border-radius:50%;background:var(--accent)}.source-access.write-enabled{color:#e7bc85;border-color:#5b4830;background:#2b231a}.source-access.write-enabled i{background:#e7bc85}.tag-form{margin:15px 0;padding:12px;border:1px solid var(--border);border-radius:7px;background:var(--bg)}.tag-fields{border:0;padding:0;margin:0;min-width:0}.tag-fields>label{display:block;font-size:10px;color:var(--muted);margin-bottom:7px}.tag-input-row{display:flex;gap:7px}.tag-input-row input{min-width:0;flex:1;border:1px solid var(--border);border-radius:5px;background:var(--panel);color:var(--text);font:11px var(--mono);padding:8px}.tag-input-row input:focus{border-color:var(--accent)}.tag-input-row button{font-size:11px}.tag-fields:disabled{opacity:.45}.tag-fields:disabled button{cursor:not-allowed}.tag-mode-hint,.tag-feedback{font-size:10px;line-height:1.7;color:var(--muted);margin:8px 0 0;overflow-wrap:anywhere}.tag-feedback{color:#e2bc84}.tag-feedback:empty,.ref-list:empty{display:none}#ownedTagCount{font:9px var(--mono);margin-left:3px}.write-dialog{width:min(460px,calc(100vw - 36px));border:1px solid #665033;border-radius:12px;padding:26px;background:var(--panel);color:var(--text);box-shadow:0 24px 100px #0008}.write-dialog::backdrop{background:#080b10b8;backdrop-filter:blur(4px)}.write-dialog h2{font-size:19px;font-weight:600;margin:14px 0}.write-dialog p{font-size:12px;color:#aeb7be;line-height:1.9}.write-dialog code{display:block;overflow-wrap:anywhere;font:11px/1.7 var(--mono);padding:10px;background:var(--bg);border-radius:6px}.warning-symbol{border:1px solid #80613c;background:#322718;border-radius:50%;width:34px;height:34px;display:grid;place-items:center;color:#e7bc85;font-size:21px}.dialog-actions{display:flex;justify-content:flex-end;gap:10px;margin-top:22px}.enable-write{background:#e2bc84;color:#251d13;border-color:#e2bc84}.enable-write:hover{background:#f0cc9b}.write-dialog .dialog-error{color:#ec9a95}.dialog-error:empty{display:none}@media(max-width:700px){.source-access{margin-left:auto}}\n.language-select{flex-shrink:0;border:1px solid var(--border);border-radius:6px;background:var(--bg);color:var(--text);padding:7px 8px;font-size:11px;cursor:pointer}#git-tree-root[lang="en"] .searchbox{min-width:220px}#git-tree-root[lang="en"] .sort-control select{max-width:200px}#git-tree-root[lang="en"] .graph-footer{font-size:9px}#git-tree-root[lang="en"] .meta-grid{grid-template-columns:50px 1fr}#git-tree-root[lang="en"] .tag-input-row button{padding-inline:10px}@media(max-width:1100px){#git-tree-root[lang="en"] .brand small{display:none}}@media(max-width:700px){.language-select{margin-left:0}#git-tree-root[lang="en"] #topbar{gap:8px}#git-tree-root[lang="en"] .source-access{font-size:10px;padding-inline:3px}#git-tree-root[lang="en"] .brand{font-size:16px}}\n@media(prefers-reduced-motion:reduce){*,*::before,*::after{transition:none!important;scroll-behavior:auto!important}}\n\n    :host{display:block;height:100%;width:100%;color:var(--text);--bg:var(--dsw-alias-bg-base,#101316);--panel:var(--dsw-alias-bg-layer-1,#15191d);--raised:var(--dsw-alias-bg-layer-2,#1c2227);--border:var(--dsw-alias-border-l1,#2a3036)}\n    #git-tree-root{height:100%;min-height:0;position:relative;overflow:hidden}#languageSelect{display:none}.brand{pointer-events:none}\n    :host([data-theme=light]){--bg:#f6f8fa;--panel:#fff;--raised:#eef2f5;--border:#d4dce3;--text:#25303b;--muted:#657380;--accent:#28754c}\n    :host([data-theme=light]) .toolbar,:host([data-theme=light]) .export-panel{background:var(--panel)}\n    :host([data-theme=light]) .graph-caption,:host([data-theme=light]) .detail-top{border-color:var(--border)}\n    :host([data-theme=light]) #graph .commit-row:hover .row-bg{fill:#dbe9e0}:host([data-theme=light]) #graph .commit-row.selected .row-bg{fill:#d0e5d7}\n    :host([data-theme=light]) #graph .commit-row.filter-hit:not(.selected):not(.matched) .row-bg{fill:#d7eadc}\n    :host([data-theme=light]) .write-dialog{background:var(--panel)}:host([data-theme=light]) .write-dialog p{color:var(--muted)}\n    :host([data-theme=light]) .hash-button{background:#e1eee6;color:#226b43}:host([data-theme=light]) #detail h2{color:var(--text)}\n  </style><div id="git-tree-root">\r\n<div id="app">\r\n  <header id="topbar">\r\n    <div class="brand"><span class="brand-icon">\u2442</span><span>Git Tree<small>LOCAL REPOSITORY EXPLORER</small></span></div>\r\n    <form id="repoForm" class="pathbox"><label for="repoInput" data-i18n="\u4ED3\u5E93">\u4ED3\u5E93</label><input id="repoInput" spellcheck="false" placeholder="\u8F93\u5165\u672C\u5730 Git \u4ED3\u5E93\u8DEF\u5F84" data-i18n-placeholder="\u8F93\u5165\u672C\u5730 Git \u4ED3\u5E93\u8DEF\u5F84" aria-label="\u672C\u5730\u4ED3\u5E93\u8DEF\u5F84" data-i18n-aria-label="\u672C\u5730\u4ED3\u5E93\u8DEF\u5F84"><button id="loadBtn" type="submit"><span data-i18n="\u6253\u5F00\u4ED3\u5E93">\u6253\u5F00\u4ED3\u5E93</span> <span>\u2197</span></button></form>\r\n    <button id="sourceAccessBtn" class="source-access" aria-pressed="false" aria-haspopup="dialog"><i></i><span id="sourceAccessLabel">\u6E90\u4ED3\u5E93\u53EA\u8BFB</span></button>\r\n    <select id="languageSelect" class="language-select" aria-label="Language / \u8BED\u8A00"><option value="zh-CN" data-i18n="\u4E2D\u6587">\u4E2D\u6587</option><option value="en">English</option></select>\r\n  </header>\r\n  <section class="overview"><div><div class="eyebrow">REPOSITORY / HISTORY</div><h1 id="repoName">\u63D0\u4EA4\u5386\u53F2</h1><div id="repoMeta">\u6BCF\u4E00\u6761\u5206\u652F\uFF0C\u90FD\u6709\u8FF9\u53EF\u5FAA\u3002</div></div><div id="stats" class="stats" aria-label="\u4ED3\u5E93\u7EDF\u8BA1" data-i18n-aria-label="\u4ED3\u5E93\u7EDF\u8BA1"></div></section>\r\n  <nav class="toolbar" aria-label="\u5386\u53F2\u5DE5\u5177" data-i18n-aria-label="\u5386\u53F2\u5DE5\u5177">\r\n    <div class="history-title"><span class="live-dot"></span> <span data-i18n="\u63D0\u4EA4\u56FE\u8C31">\u63D0\u4EA4\u56FE\u8C31</span> <span id="commitCount" class="count">0</span></div>\r\n    <div id="typeFilters" class="type-filters" role="group" aria-label="\u63D0\u4EA4\u7C7B\u578B\u7B5B\u9009\uFF0C\u652F\u6301\u591A\u9009" data-i18n-aria-label="\u63D0\u4EA4\u7C7B\u578B\u7B5B\u9009\uFF0C\u652F\u6301\u591A\u9009"></div>\r\n    <span id="filterCount" class="filter-count" role="status"></span>\r\n    <label class="sort-control" for="sortSelect"><span data-i18n="\u6392\u5E8F">\u6392\u5E8F</span><select id="sortSelect" aria-label="\u63D0\u4EA4\u6392\u5E8F" data-i18n-aria-label="\u63D0\u4EA4\u6392\u5E8F"><option value="date-desc" data-i18n="\u4ECE\u65B0\u5230\u65E7">\u4ECE\u65B0\u5230\u65E7</option><option value="date-asc" data-i18n="\u4ECE\u65E7\u5230\u65B0">\u4ECE\u65E7\u5230\u65B0</option><option value="edits-desc" data-i18n="\u7F16\u8F91\u91CF\uFF1A\u4ECE\u5927\u5230\u5C0F">\u7F16\u8F91\u91CF\uFF1A\u4ECE\u5927\u5230\u5C0F</option><option value="edits-asc" data-i18n="\u7F16\u8F91\u91CF\uFF1A\u4ECE\u5C0F\u5230\u5927">\u7F16\u8F91\u91CF\uFF1A\u4ECE\u5C0F\u5230\u5927</option><option value="files-desc" data-i18n="\u6D89\u53CA\u6587\u4EF6\uFF1A\u4ECE\u591A\u5230\u5C11">\u6D89\u53CA\u6587\u4EF6\uFF1A\u4ECE\u591A\u5230\u5C11</option><option value="files-asc" data-i18n="\u6D89\u53CA\u6587\u4EF6\uFF1A\u4ECE\u5C11\u5230\u591A">\u6D89\u53CA\u6587\u4EF6\uFF1A\u4ECE\u5C11\u5230\u591A</option></select></label>\r\n    <span id="sortStatus" class="sort-status" role="status"></span>\r\n    <div class="searchbox"><span aria-hidden="true">\u2315</span><input id="searchInput" type="search" placeholder="\u641C\u7D22\u63D0\u4EA4\u3001\u4F5C\u8005\u3001\u54C8\u5E0C\u2026" data-i18n-placeholder="\u641C\u7D22\u63D0\u4EA4\u3001\u4F5C\u8005\u3001\u54C8\u5E0C\u2026" aria-label="\u641C\u7D22\u63D0\u4EA4" data-i18n-aria-label="\u641C\u7D22\u63D0\u4EA4"><span id="searchCount"></span><button id="searchNext" class="icon-button" aria-label="\u4E0B\u4E00\u4E2A\u641C\u7D22\u7ED3\u679C" data-i18n-aria-label="\u4E0B\u4E00\u4E2A\u641C\u7D22\u7ED3\u679C" title="\u4E0B\u4E00\u4E2A\u7ED3\u679C / Enter" data-i18n-title="\u4E0B\u4E00\u4E2A\u7ED3\u679C / Enter">\u2193</button></div>\r\n    <button id="headBtn" class="quiet-button">\u25CE <span data-i18n="\u5B9A\u4F4D HEAD">\u5B9A\u4F4D HEAD</span></button>\r\n    <button id="undoTagsBtn" class="quiet-button" disabled title="\u64A4\u56DE\u5F53\u524D\u4ED3\u5E93\u4E2D\u672C\u8F6F\u4EF6\u521B\u5EFA\u7684\u6240\u6709\u6807\u7B7E\uFF0C\u4FDD\u7559\u624B\u52A8\u6807\u7B7E\u53CA\u540E\u6765\u88AB\u4FEE\u6539\u7684\u6807\u7B7E" data-i18n-title="\u64A4\u56DE\u5F53\u524D\u4ED3\u5E93\u4E2D\u672C\u8F6F\u4EF6\u521B\u5EFA\u7684\u6240\u6709\u6807\u7B7E\uFF0C\u4FDD\u7559\u624B\u52A8\u6807\u7B7E\u53CA\u540E\u6765\u88AB\u4FEE\u6539\u7684\u6807\u7B7E">\u21B6 <span data-i18n="\u64A4\u56DE\u8F6F\u4EF6\u6807\u7B7E">\u64A4\u56DE\u8F6F\u4EF6\u6807\u7B7E</span> <span id="ownedTagCount">0</span></button>\r\n  </nav>\r\n  <main id="stage">\r\n    <section id="history" aria-label="Git \u63D0\u4EA4\u56FE\u8C31" data-i18n-aria-label="Git \u63D0\u4EA4\u56FE\u8C31">\r\n      <div class="graph-caption"><span id="mainLabel">\u4E3B\u5206\u652F</span></div>\r\n      <div id="scroller" tabindex="0" aria-label="\u63D0\u4EA4\u5386\u53F2\uFF0C\u4F7F\u7528\u4E0A\u4E0B\u65B9\u5411\u952E\u9009\u62E9\uFF0CEscape \u5173\u95ED\u8BE6\u60C5" data-i18n-aria-label="\u63D0\u4EA4\u5386\u53F2\uFF0C\u4F7F\u7528\u4E0A\u4E0B\u65B9\u5411\u952E\u9009\u62E9\uFF0CEscape \u5173\u95ED\u8BE6\u60C5">\r\n        <svg id="graph" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Git \u63D0\u4EA4\u5173\u7CFB\u56FE" data-i18n-aria-label="Git \u63D0\u4EA4\u5173\u7CFB\u56FE"></svg>\r\n        <div id="emptyState" class="empty-state" hidden><span>\u2442</span><h2 data-i18n="\u6253\u5F00\u4E00\u6BB5\u63D0\u4EA4\u5386\u53F2">\u6253\u5F00\u4E00\u6BB5\u63D0\u4EA4\u5386\u53F2</h2><p data-i18n="\u5728\u4E0A\u65B9\u8F93\u5165\u672C\u5730 Git \u4ED3\u5E93\u7684\u8DEF\u5F84\u3002">\u5728\u4E0A\u65B9\u8F93\u5165\u672C\u5730 Git \u4ED3\u5E93\u7684\u8DEF\u5F84\u3002</p></div>\r\n      </div>\r\n      <footer class="graph-footer"><div><span class="legend-dot"></span> <span data-i18n="\u63D0\u4EA4">\u63D0\u4EA4</span> <span class="legend-merge"></span> <span data-i18n="\u5408\u5E76">\u5408\u5E76</span> <span class="legend-root"></span> <span data-i18n="\u6839\u63D0\u4EA4">\u6839\u63D0\u4EA4</span></div><span data-i18n="\u70B9\u51FB\u63D0\u4EA4\u67E5\u770B\u8BE6\u60C5 \xB7 Esc \u5173\u95ED">\u70B9\u51FB\u63D0\u4EA4\u67E5\u770B\u8BE6\u60C5 \xB7 Esc \u5173\u95ED</span></footer>\r\n    </section>\r\n    <aside id="detail" aria-label="\u63D0\u4EA4\u8BE6\u60C5" data-i18n-aria-label="\u63D0\u4EA4\u8BE6\u60C5" inert><div class="detail-top"><span><span data-i18n="\u63D0\u4EA4\u8BE6\u60C5">\u63D0\u4EA4\u8BE6\u60C5</span> <span id="detailIndex"></span></span><button id="closeDetail" class="icon-button" aria-label="\u5173\u95ED\u63D0\u4EA4\u8BE6\u60C5" data-i18n-aria-label="\u5173\u95ED\u63D0\u4EA4\u8BE6\u60C5" title="\u5173\u95ED / Esc" data-i18n-title="\u5173\u95ED / Esc">\xD7</button></div><div id="detailContent"></div></aside>\r\n  </main>\r\n  <div id="status" role="status" class="status hidden"></div>\r\n  <dialog id="writeAccessDialog" class="write-dialog" aria-labelledby="writeAccessTitle">\r\n    <div class="warning-symbol">!</div><h2 id="writeAccessTitle" data-i18n="\u542F\u7528\u6E90\u4ED3\u5E93\u8BFB\u5199\uFF1F">\u542F\u7528\u6E90\u4ED3\u5E93\u8BFB\u5199\uFF1F</h2>\r\n    <p data-i18n="\u5F00\u542F\u540E\uFF0C\u53EF\u4EE5\u5728\u6E90\u4ED3\u5E93\u4E2D\u521B\u5EFA\u672C\u5730 Git \u6807\u7B7E\uFF0C\u4E5F\u53EF\u4EE5\u4E00\u952E\u64A4\u56DE\u672C\u8F6F\u4EF6\u521B\u5EFA\u7684\u5168\u90E8\u6807\u7B7E\u3002\u8FD9\u4E9B\u64CD\u4F5C\u4F1A\u4FEE\u6539\u4ED3\u5E93\u7684 Git \u5F15\u7528\u8BB0\u5F55\u3002">\u5F00\u542F\u540E\uFF0C\u53EF\u4EE5\u5728\u6E90\u4ED3\u5E93\u4E2D\u521B\u5EFA\u672C\u5730 Git \u6807\u7B7E\uFF0C\u4E5F\u53EF\u4EE5\u4E00\u952E\u64A4\u56DE\u672C\u8F6F\u4EF6\u521B\u5EFA\u7684\u5168\u90E8\u6807\u7B7E\u3002\u8FD9\u4E9B\u64CD\u4F5C\u4F1A\u4FEE\u6539\u4ED3\u5E93\u7684 Git \u5F15\u7528\u8BB0\u5F55\u3002</p>\r\n    <p data-i18n="\u4E0D\u4F1A\u6539\u53D8\u5DE5\u4F5C\u533A\u6587\u4EF6\u6216\u5F53\u524D\u5206\u652F\uFF1B\u6807\u7B7E\u987B\u624B\u52A8\u63A8\u9001\u5230\u8FDC\u7AEF\u3002\u5207\u6362\u4ED3\u5E93\u6216\u5237\u65B0\u9875\u9762\u540E\u6062\u590D\u53EA\u8BFB\u3002">\u4E0D\u4F1A\u6539\u53D8\u5DE5\u4F5C\u533A\u6587\u4EF6\u6216\u5F53\u524D\u5206\u652F\uFF1B\u6807\u7B7E\u987B\u624B\u52A8\u63A8\u9001\u5230\u8FDC\u7AEF\u3002\u5207\u6362\u4ED3\u5E93\u6216\u5237\u65B0\u9875\u9762\u540E\u6062\u590D\u53EA\u8BFB\u3002</p>\r\n    <code id="writeAccessRepo"></code><p id="writeAccessError" class="dialog-error" role="status"></p>\r\n    <div class="dialog-actions"><button id="cancelWriteBtn" type="button" data-i18n="\u4FDD\u6301\u53EA\u8BFB">\u4FDD\u6301\u53EA\u8BFB</button><button id="enableWriteBtn" type="button" class="enable-write" data-i18n="\u542F\u7528\u8BFB\u5199">\u542F\u7528\u8BFB\u5199</button></div>\r\n  </dialog>\r\n</div>\r\n\r\n\r\n</div>';
  const container = root.getElementById("git-tree-root"), controller = new AbortController(), timers = /* @__PURE__ */ new Set(), frames = /* @__PURE__ */ new Set(), observers = /* @__PURE__ */ new Set();
  let disposed = false, currentRepo = bridge.repo, pendingRepository = null, pendingLocale = null;
  const document = { getElementById: (id) => container.querySelector("#" + id), querySelectorAll: (selector) => container.querySelectorAll(selector), body: container, documentElement: container, title: "", addEventListener: (name2, listener, options) => container.addEventListener(name2, listener, { ...typeof options === "object" ? options : {}, signal: controller.signal }) };
  const location = { search: "" }, history = { replaceState() {
  } };
  const setTimeout = (fn, ms) => {
    if (disposed) return 0;
    const id = globalThis.setTimeout(() => {
      timers.delete(id);
      if (!disposed) fn();
    }, ms);
    timers.add(id);
    return id;
  };
  const clearTimeout = (id) => {
    globalThis.clearTimeout(id);
    timers.delete(id);
  };
  const requestAnimationFrame = (fn) => {
    if (disposed) return 0;
    const id = globalThis.requestAnimationFrame((time) => {
      frames.delete(id);
      if (!disposed) fn(time);
    });
    frames.add(id);
    return id;
  };
  const ResizeObserver = class extends globalThis.ResizeObserver {
    constructor(callback) {
      super(callback);
      observers.add(this);
    }
  };
  const fetch = async (url, options) => {
    controller.signal.throwIfAborted();
    const parsed = new URL(url, "http://git-tree.invalid");
    const endpoint = parsed.pathname.replace(/^\/api\//, "");
    const payload = options?.body ? JSON.parse(options.body) : Object.fromEntries(parsed.searchParams);
    if (payload.parent !== void 0) payload.parent = Number(payload.parent);
    if (!payload.repo) payload.repo = currentRepo;
    const reply = await bridge.request(endpoint, payload, controller.signal);
    if (disposed && endpoint === "write-access" && payload.enabled && reply.ok && reply.value?.token) {
      await bridge.request("write-access", { repo: payload.repo, token: reply.value.token, enabled: false });
    }
    return { ok: reply.ok, status: reply.ok ? 200 : 400, headers: { get: () => "application/json" }, json: async () => reply.ok ? { ok: true, data: reply.value } : { ok: false, error: reply.error.message } };
  };
  "use strict";
  var I18N = (() => {
    const en2 = {
      "\u4E2D\u6587": "\u4E2D\u6587",
      "Git Tree \xB7 \u63D0\u4EA4\u5386\u53F2": "Git Tree \xB7 Commit History",
      "Git Tree \u9996\u9875": "Git Tree home",
      "\u4ED3\u5E93": "Repository",
      "\u8F93\u5165\u672C\u5730 Git \u4ED3\u5E93\u8DEF\u5F84": "Enter a local Git repository path",
      "\u672C\u5730\u4ED3\u5E93\u8DEF\u5F84": "Local repository path",
      "\u6253\u5F00\u4ED3\u5E93": "Open repository",
      "\u8BFB\u53D6\u4E2D\u2026": "Loading\u2026",
      "\u63D0\u4EA4\u5386\u53F2": "Commit history",
      "\u6BCF\u4E00\u6761\u5206\u652F\uFF0C\u90FD\u6709\u8FF9\u53EF\u5FAA\u3002": "Every branch has a story.",
      "\u4ED3\u5E93\u7EDF\u8BA1": "Repository statistics",
      "\u5386\u53F2\u5DE5\u5177": "History tools",
      "\u63D0\u4EA4\u56FE\u8C31": "Commit graph",
      "\u63D0\u4EA4\u7C7B\u578B\u7B5B\u9009\uFF0C\u652F\u6301\u591A\u9009": "Commit type filters, multiple selection allowed",
      "\u6392\u5E8F": "Sort",
      "\u63D0\u4EA4\u6392\u5E8F": "Commit order",
      "\u4ECE\u65B0\u5230\u65E7": "Newest first",
      "\u4ECE\u65E7\u5230\u65B0": "Oldest first",
      "\u7F16\u8F91\u91CF\uFF1A\u4ECE\u5927\u5230\u5C0F": "Most lines changed",
      "\u7F16\u8F91\u91CF\uFF1A\u4ECE\u5C0F\u5230\u5927": "Fewest lines changed",
      "\u6D89\u53CA\u6587\u4EF6\uFF1A\u4ECE\u591A\u5230\u5C11": "Most files changed",
      "\u6D89\u53CA\u6587\u4EF6\uFF1A\u4ECE\u5C11\u5230\u591A": "Fewest files changed",
      "\u641C\u7D22\u63D0\u4EA4\u3001\u4F5C\u8005\u3001\u54C8\u5E0C\u2026": "Search commits, authors, hashes\u2026",
      "\u641C\u7D22\u63D0\u4EA4": "Search commits",
      "\u4E0B\u4E00\u4E2A\u641C\u7D22\u7ED3\u679C": "Next search result",
      "\u4E0B\u4E00\u4E2A\u7ED3\u679C / Enter": "Next result / Enter",
      "\u5B9A\u4F4D HEAD": "Go to HEAD",
      "\u64A4\u56DE\u8F6F\u4EF6\u6807\u7B7E": "Undo app tags",
      "\u64A4\u56DE\u5F53\u524D\u4ED3\u5E93\u4E2D\u672C\u8F6F\u4EF6\u521B\u5EFA\u7684\u6240\u6709\u6807\u7B7E\uFF0C\u4FDD\u7559\u624B\u52A8\u6807\u7B7E\u53CA\u540E\u6765\u88AB\u4FEE\u6539\u7684\u6807\u7B7E": "Remove all tags created by this app in this repository; preserve manual and subsequently modified tags",
      "Git \u63D0\u4EA4\u56FE\u8C31": "Git commit graph",
      "\u4E3B\u5206\u652F": "Main branch",
      "\u63D0\u4EA4\u5386\u53F2\uFF0C\u4F7F\u7528\u4E0A\u4E0B\u65B9\u5411\u952E\u9009\u62E9\uFF0CEscape \u5173\u95ED\u8BE6\u60C5": "Commit history. Use arrow keys to select; Escape closes details.",
      "Git \u63D0\u4EA4\u5173\u7CFB\u56FE": "Git commit relationships",
      "\u6253\u5F00\u4E00\u6BB5\u63D0\u4EA4\u5386\u53F2": "Explore a repository",
      "\u5728\u4E0A\u65B9\u8F93\u5165\u672C\u5730 Git \u4ED3\u5E93\u7684\u8DEF\u5F84\u3002": "Enter a local Git repository path above.",
      "\u63D0\u4EA4": "Commits",
      "\u5408\u5E76": "Merges",
      "\u6839\u63D0\u4EA4": "Root",
      "\u5206\u652F": "Branches",
      "\u6807\u7B7E": "Tags",
      "\u70B9\u51FB\u63D0\u4EA4\u67E5\u770B\u8BE6\u60C5 \xB7 Esc \u5173\u95ED": "Click a commit for details \xB7 Esc to close",
      "\u63D0\u4EA4\u8BE6\u60C5": "Commit details",
      "\u5173\u95ED\u63D0\u4EA4\u8BE6\u60C5": "Close commit details",
      "\u5173\u95ED / Esc": "Close / Esc",
      "\u542F\u7528\u6E90\u4ED3\u5E93\u8BFB\u5199\uFF1F": "Enable repository write access?",
      "\u5F00\u542F\u540E\uFF0C\u53EF\u4EE5\u5728\u6E90\u4ED3\u5E93\u4E2D\u521B\u5EFA\u672C\u5730 Git \u6807\u7B7E\uFF0C\u4E5F\u53EF\u4EE5\u4E00\u952E\u64A4\u56DE\u672C\u8F6F\u4EF6\u521B\u5EFA\u7684\u5168\u90E8\u6807\u7B7E\u3002\u8FD9\u4E9B\u64CD\u4F5C\u4F1A\u4FEE\u6539\u4ED3\u5E93\u7684 Git \u5F15\u7528\u8BB0\u5F55\u3002": "This allows you to create local Git tags and remove all tags created by this app. These actions modify Git references in the source repository.",
      "\u4E0D\u4F1A\u6539\u53D8\u5DE5\u4F5C\u533A\u6587\u4EF6\u6216\u5F53\u524D\u5206\u652F\uFF1B\u6807\u7B7E\u987B\u624B\u52A8\u63A8\u9001\u5230\u8FDC\u7AEF\u3002\u5207\u6362\u4ED3\u5E93\u6216\u5237\u65B0\u9875\u9762\u540E\u6062\u590D\u53EA\u8BFB\u3002": "Working files and the current branch stay unchanged. Tags must be pushed manually. Switching repositories or refreshing restores read-only mode.",
      "\u4FDD\u6301\u53EA\u8BFB": "Keep read-only",
      "\u542F\u7528\u8BFB\u5199": "Enable write access",
      "\u6E90\u4ED3\u5E93\u53EA\u8BFB": "Repository read-only",
      "\u6E90\u4ED3\u5E93\u8BFB\u5199": "Repository read/write",
      "\u65B0\u529F\u80FD": "Feature",
      "\u4FEE\u590D": "Fix",
      "\u91CD\u6784": "Refactor",
      "\u6027\u80FD": "Performance",
      "\u6587\u6863": "Documentation",
      "\u6D4B\u8BD5": "Tests",
      "\u7EF4\u62A4": "Maintenance",
      "\u6784\u5EFA": "Build",
      "\u6301\u7EED\u96C6\u6210": "CI",
      "\uFF08\u65E0\u6807\u9898\uFF09": "(Untitled)",
      "\u7834\u574F\u6027\u53D8\u66F4": "Breaking change",
      "\u5168\u90E8": "All",
      "\uFF1A\u6E05\u9664\u7C7B\u578B\u7B5B\u9009": ": clear type filters",
      "\uFF1A\u70B9\u51FB\u5207\u6362\uFF0C\u53EF\u591A\u9009": ": toggle; multiple selection allowed",
      "{count} \u4E2A\u63D0\u4EA4\u5339\u914D\uFF0C\u5176\u4ED6\u63D0\u4EA4\u6697\u663E": "{count} matching commits; other commits are dimmed",
      "\u4E3B\u7EBF": "mainline",
      "\u63D0\u4EA4\u5217\u8868": "Commit list",
      "\u7F16\u8F91\u91CF": "Lines changed",
      "\u6587\u4EF6\u6570": "Files changed",
      "\u7EDF\u8BA1\u53D8\u66F4\u91CF\u2026": "Counting changes\u2026",
      "\u4ED3\u5E93\u5386\u53F2\u5DF2\u53D8\u5316\uFF0C\u8BF7\u91CD\u65B0\u6253\u5F00\u4ED3\u5E93\u540E\u6392\u5E8F\u3002": "Repository history has changed. Reopen the repository before sorting.",
      "\u6392\u5E8F\u5931\u8D25\uFF1A": "Could not sort: ",
      "\u6587\u4EF6": "files",
      "\u4E2A": "items",
      "MERGE COMMIT / \u5408\u5E76\u63D0\u4EA4": "MERGE COMMIT",
      "ROOT COMMIT / \u6839\u63D0\u4EA4": "ROOT COMMIT",
      "COMMIT / \u63D0\u4EA4": "COMMIT",
      "\u590D\u5236\u5B8C\u6574\u54C8\u5E0C \u29C9": "Copy full hash \u29C9",
      "\u672C\u5730\u6807\u7B7E": "Local tag",
      "\u4F8B\u5982 v1.0 \u6216 review/important": "e.g. v1.0 or review/important",
      "\u65B0\u6807\u7B7E\u540D\u79F0": "New tag name",
      "\u6253\u6807\u7B7E": "Create tag",
      "\u6807\u7B7E\u4FDD\u5B58\u5728\u672C\u5730\uFF0C\u987B\u624B\u52A8\u63A8\u9001\u5230\u8FDC\u7AEF\u3002": "Tags are stored locally and must be pushed manually.",
      "\u6253\u6807\u7B7E\u524D\uFF0C\u8BF7\u5728\u53F3\u4E0A\u89D2\u5F00\u542F\u201C\u6E90\u4ED3\u5E93\u8BFB\u5199\u201D\u3002": "Enable repository write access at the top right before creating tags.",
      "\u4F5C\u8005": "Author",
      "\u65F6\u95F4": "Date",
      "\u5BFC\u51FA\u6B64\u7248\u672C": "Export this version",
      "\u5BFC\u51FA {hash} \u8BB0\u5F55\u7684\u72B6\u6001\uFF0C\u4E0D\u5305\u542B\u5DE5\u4F5C\u533A\u672A\u63D0\u4EA4\u7684\u4FEE\u6539\u3002": "Export the state recorded in {hash}, excluding uncommitted changes.",
      "\u76EE\u6807\u6587\u4EF6\u5939": "Destination folder",
      "\u8F93\u5165\u76EE\u6807\u6587\u4EF6\u5939\u7684\u7EDD\u5BF9\u8DEF\u5F84": "Enter an absolute destination path",
      "\u76EE\u5F55\u987B\u4E0D\u5B58\u5728\u6216\u4E3A\u7A7A\uFF0C\u4E0A\u7EA7\u76EE\u5F55\u987B\u5DF2\u5B58\u5728\u3002": "The destination must be empty or not exist. Its parent folder must exist.",
      "\u4FDD\u7559 .git\uFF0C\u5EFA\u7ACB\u72EC\u7ACB\u4ED3\u5E93": "Include .git as an independent repository",
      "\u4EC5\u5BFC\u51FA\u63D0\u4EA4\u4E2D\u7684\u6587\u4EF6\uFF0C\u4E0D\u9644\u5E26 Git \u5386\u53F2\u3002": "Export committed files only, without Git history.",
      "\u65B0\u5206\u652F\u540D\u79F0\uFF08\u53EF\u9009\uFF09": "New branch name (optional)",
      "\u4F8B\u5982 review/version": "e.g. review/version",
      "\u7559\u7A7A\u65F6\u505C\u7559\u5728\u6B64\u63D0\u4EA4\uFF08detached HEAD\uFF09\u3002": "Leave blank to check out this commit with a detached HEAD.",
      "\u5DF2\u6709\u5BFC\u51FA\u4EFB\u52A1\u8FDB\u884C\u4E2D\u2026": "Another export is running\u2026",
      "\u5BFC\u51FA\u5230\u76EE\u6807\u6587\u4EF6\u5939": "Export to folder",
      "\u7236\u63D0\u4EA4": "Parents",
      "\u5B50\u63D0\u4EA4": "Children",
      "\u6587\u4EF6\u53D8\u66F4": "Changed files",
      "\u6BD4\u8F83\u57FA\u51C6": "Compare against",
      "\u9009\u62E9\u6BD4\u8F83\u7684\u7236\u63D0\u4EA4": "Choose the comparison parent",
      "\u7236\u63D0\u4EA4 {number} \xB7 {hash}": "Parent {number} \xB7 {hash}",
      "\u7A7A\u76EE\u5F55\uFF08\u521D\u59CB\u63D0\u4EA4\uFF09": "Empty tree (initial commit)",
      "\u6B63\u5728\u8BFB\u53D6\u53D8\u66F4\u2026": "Loading changes\u2026",
      "\u5F53\u524D\u8FD0\u884C\u7684\u662F\u65E7\u7248\u540E\u7AEF\uFF0C\u5C1A\u4E0D\u652F\u6301\u63D0\u4EA4\u8BE6\u60C5\u3002\u8BF7\u91CD\u542F server.py\uFF0C\u6216\u6253\u5F00\u65B0\u7248\u9884\u89C8 http://127.0.0.1:8770\u3002": "The running backend is outdated. Restart server.py or open http://127.0.0.1:8770.",
      "\u670D\u52A1\u672A\u8FD4\u56DE\u6709\u6548\u7684 JSON \u6570\u636E\uFF08HTTP {status}\uFF09\uFF0C\u8BF7\u786E\u8BA4\u5DF2\u542F\u52A8\u65B0\u7248 server.py\u3002": "The server did not return valid JSON (HTTP {status}). Ensure the updated server.py is running.",
      "\u8BF7\u6C42\u5931\u8D25 ({status})": "Request failed ({status})",
      "\u5DF2\u5F00\u542F\u6E90\u4ED3\u5E93\u8BFB\u5199\uFF0C\u53EF\u521B\u5EFA\u6216\u64A4\u56DE\u672C\u5730\u6807\u7B7E": "Write access enabled. Local tags can now be created or removed.",
      "\u8BF7\u5148\u5728\u53F3\u4E0A\u89D2\u5F00\u542F\u6E90\u4ED3\u5E93\u8BFB\u5199": "Enable repository write access at the top right first.",
      "\u6B63\u5728\u521B\u5EFA\u6807\u7B7E\u2026": "Creating tag\u2026",
      "\u5DF2\u521B\u5EFA\u672C\u5730\u6807\u7B7E\uFF1A": "Local tag created: ",
      "\u5DF2\u6253\u6807\u7B7E\uFF1A": "Tag created: ",
      "\u521B\u5EFA\u5931\u8D25\uFF1A": "Creation failed: ",
      "\u521B\u5EFA\u6807\u7B7E\u5931\u8D25\uFF1A": "Could not create tag: ",
      "\u5DF2\u64A4\u56DE {count} \u4E2A\u672C\u8F6F\u4EF6\u6807\u7B7E": "Removed {count} app-created tags",
      "\uFF1B\u8DF3\u8FC7 {count} \u4E2A\u5DF2\u88AB\u4FEE\u6539\u7684\u6807\u7B7E\uFF1A": "; skipped {count} modified tags: ",
      "\u64A4\u56DE\u6807\u7B7E\u5931\u8D25\uFF1A": "Could not undo tags: ",
      "\u5DF2\u5BFC\u51FA": "Exported",
      "\u72EC\u7ACB Git \u4ED3\u5E93": "Independent Git repository",
      "\u7EAF\u6587\u4EF6\u5FEB\u7167": "File snapshot",
      "\u6253\u5F00\u6587\u4EF6\u5939": "Open folder",
      "\u6B63\u5728\u68C0\u67E5\u6B64\u7248\u672C\u7684\u5BFC\u51FA\u8303\u56F4\u2026": "Checking export contents\u2026",
      "{count} \u4E2A\u6587\u4EF6": "{count} files",
      " \xB7 {count} \u4E2A\u5B50\u6A21\u5757": " \xB7 {count} submodules",
      "\u65E0\u6CD5\u68C0\u67E5\u5BFC\u51FA\u8303\u56F4\uFF1A": "Could not inspect export contents: ",
      "\u91CD\u8BD5\u68C0\u67E5": "Retry check",
      "\u8BF7\u586B\u5199\u76EE\u6807\u6587\u4EF6\u5939": "Enter a destination folder.",
      "\u6B63\u5728\u5BFC\u51FA\uFF0C\u8BF7\u7A0D\u5019\u2026": "Exporting, please wait\u2026",
      "\u5BFC\u51FA\u5B8C\u6210\uFF1A": "Export complete: ",
      "\u5BFC\u51FA\u5931\u8D25\uFF1A": "Export failed: ",
      "\u6B63\u5728\u8BFB\u53D6\u5DEE\u5F02\u2026": "Loading diff\u2026",
      "\u4E8C\u8FDB\u5236": "Binary",
      "\u5168\u90E8\u5DEE\u5F02 \xB7 {count} \u4E2A\u6587\u4EF6": "Full diff \xB7 {count} files",
      "\u67E5\u770B\u5168\u90E8": "View all",
      "\u6B64\u63D0\u4EA4\u76F8\u5BF9\u6B64\u57FA\u51C6\u6CA1\u6709\u6587\u4EF6\u53D8\u66F4\u3002": "This commit has no file changes against this base.",
      "\u5DEE\u5F02\u8F83\u5927\uFF0C\u4EC5\u663E\u793A\u524D 200,000 \u4E2A\u5B57\u7B26\u3002\u53EF\u70B9\u51FB\u5355\u4E2A\u6587\u4EF6\u67E5\u770B\u3002": "Large diff: only the first 200,000 characters are shown. Select a file to view its diff.",
      "\u4EE3\u7801\u5DEE\u5F02": "Code diff",
      "\u6CA1\u6709\u6587\u672C\u5DEE\u5F02": "No textual changes",
      "\u65E0\u6CD5\u8BFB\u53D6\u5DEE\u5F02\uFF1A": "Could not load diff: ",
      "\u91CD\u65B0\u8BFB\u53D6": "Retry",
      "\u672A\u547D\u540D\u5206\u652F": "Unnamed branch",
      "\u8FD9\u91CC\u8FD8\u6CA1\u6709\u63D0\u4EA4": "No commits yet",
      "\u4E3A\u4ED3\u5E93\u521B\u5EFA\u7B2C\u4E00\u6B21\u63D0\u4EA4\u540E\uFF0C\u91CD\u65B0\u6253\u5F00\u5373\u53EF\u67E5\u770B\u3002": "Create the first commit, then reopen this repository.",
      "\u52A0\u8F7D\u5931\u8D25\uFF1A": "Could not load: ",
      "\u4ED3\u5E93\u5C1A\u672A\u6253\u5F00": "No repository open",
      "\u65E0\u7ED3\u679C": "No results",
      "\u65E0\u6CD5\u6253\u5F00\u6587\u4EF6\u5939\uFF1A": "Could not open folder: ",
      "\u5DF2\u590D\u5236\u5B8C\u6574\u63D0\u4EA4\u54C8\u5E0C": "Full commit hash copied",
      "\u590D\u5236\u5931\u8D25\uFF0C\u8BF7\u4ECE\u6309\u94AE\u63D0\u793A\u4E2D\u83B7\u53D6\u5B8C\u6574\u54C8\u5E0C": "Copy failed. The full hash is available in the button tooltip.",
      "\u590D\u5236\u72EC\u7ACB\u7684 Git \u5386\u53F2\u5E76\u68C0\u51FA\u6B64\u63D0\u4EA4\uFF0C\u4E0D\u4F9D\u8D56\u6E90\u4ED3\u5E93\u7684\u5BF9\u8C61\u6587\u4EF6\u3002": "Copy independent Git history and check out this commit, without relying on source repository objects.",
      "\u5DF2\u5207\u56DE\u6E90\u4ED3\u5E93\u53EA\u8BFB": "Repository switched back to read-only",
      "\u5F53\u524D HEAD \u6CA1\u6709\u53EF\u663E\u793A\u7684\u63D0\u4EA4": "No commit is available for the current HEAD.",
      "\u5305\u542B {count} \u4E2A\u5B50\u6A21\u5757\uFF1A\u4EC5\u521B\u5EFA\u7A7A\u76EE\u5F55\uFF0C\u4E0D\u4E0B\u8F7D\u5B50\u6A21\u5757\u5185\u5BB9\u3002": "Contains {count} submodules: only empty folders are created; submodule contents are not downloaded.",
      "\u6B64\u7248\u672C\u5305\u542B Git LFS \u89C4\u5219\uFF1A\u4FDD\u7559\u5DF2\u63D0\u4EA4\u7684\u6307\u9488\u6587\u4EF6\uFF0C\u4E0D\u4E0B\u8F7D LFS \u5927\u6587\u4EF6\u3002": "This version has Git LFS rules: committed pointer files are preserved; LFS objects are not downloaded.",
      "\u6B64\u7248\u672C\u5305\u542B\u7B26\u53F7\u94FE\u63A5\uFF1AWindows \u4E0D\u5141\u8BB8\u521B\u5EFA\u94FE\u63A5\u65F6\uFF0C\u4F1A\u4FDD\u7559\u94FE\u63A5\u76EE\u6807\u6587\u672C\u3002": "This version contains symbolic links. If Windows disallows link creation, the link target is saved as text.",
      "\u63D0\u4EA4\u5FC5\u987B\u662F\u6709\u6548\u7684 Git \u54C8\u5E0C": "The commit must be a valid Git hash.",
      "\u7236\u63D0\u4EA4\u4E0D\u5B58\u5728": "The parent commit does not exist.",
      "\u6587\u4EF6\u4E0D\u5728\u672C\u6B21\u53D8\u66F4\u4E2D": "The file is not part of this change.",
      "\u4ED3\u5E93\u8DEF\u5F84\u65E0\u6548": "Invalid repository path.",
      "\u8BFB\u5199\u6A21\u5F0F\u65E0\u6548": "Invalid access mode.",
      "\u6E90\u4ED3\u5E93\u5F53\u524D\u4E3A\u53EA\u8BFB\uFF0C\u8BF7\u5148\u5728\u53F3\u4E0A\u89D2\u5F00\u542F\u8BFB\u5199\u6A21\u5F0F": "The source repository is read-only. Enable write access at the top right first.",
      "\u8BF7\u586B\u5199\u6807\u7B7E\u540D\u79F0": "Enter a tag name.",
      "\u8BF7\u8F93\u5165\u6807\u7B7E\u77ED\u540D\u79F0\uFF0C\u4F8B\u5982 v1.0 \u6216 review/important": "Enter a short tag name, such as v1.0 or review/important.",
      "\u8BF7\u9009\u62E9\u6709\u6548\u7684\u63D0\u4EA4\u54C8\u5E0C": "Select a valid commit hash.",
      "\u8BF7\u8F93\u5165\u76EE\u6807\u6587\u4EF6\u5939\u7684\u7EDD\u5BF9\u8DEF\u5F84": "Enter an absolute destination path.",
      "\u76EE\u6807\u4E0D\u80FD\u662F\u7B26\u53F7\u94FE\u63A5\u6216\u76EE\u5F55\u8054\u63A5": "The destination cannot be a symbolic link or directory junction.",
      "\u8BF7\u4F7F\u7528\u6E90\u4ED3\u5E93\u4E4B\u5916\u7684\u76EE\u6807\u6587\u4EF6\u5939": "Choose a destination outside the source repository.",
      "\u76EE\u6807\u6587\u4EF6\u5939\u7684\u4E0A\u7EA7\u76EE\u5F55\u4E0D\u5B58\u5728\uFF0C\u8BF7\u5148\u521B\u5EFA\u4E0A\u7EA7\u76EE\u5F55": "The parent folder does not exist. Create it first.",
      "\u76EE\u6807\u6587\u4EF6\u5939\u5FC5\u987B\u4E0D\u5B58\u5728\u6216\u4E3A\u7A7A\uFF0C\u4E0D\u4F1A\u8986\u76D6\u5DF2\u6709\u6587\u4EF6": "The destination must be empty or not exist. Existing files will not be overwritten.",
      "\u63D0\u4EA4\u5305\u542B\u4E0D\u80FD\u5B89\u5168\u5BFC\u51FA\u7684\u6587\u4EF6\u8DEF\u5F84": "This commit contains a path that cannot be safely exported.",
      "\u63D0\u4EA4\u6587\u4EF6\u8DEF\u5F84\u8D85\u51FA\u76EE\u6807\u76EE\u5F55": "A committed file path escapes the destination.",
      "Git \u6587\u4EF6\u6D41\u683C\u5F0F\u9519\u8BEF": "Invalid Git file stream.",
      "\u8BFB\u53D6 Git \u6587\u4EF6\u5931\u8D25": "Could not read Git files.",
      "\u5BFC\u51FA\u9009\u9879\u65E0\u6548": "Invalid export options.",
      "\u4EC5\u5E26 Git \u4ED3\u5E93\u6A21\u5F0F\u652F\u6301\u521B\u5EFA\u5206\u652F": "Creating a branch requires including .git.",
      "\u76EE\u5F55\u65E0\u6548": "Invalid folder.",
      "\u53EA\u80FD\u6253\u5F00\u672C\u6B21\u670D\u52A1\u6210\u529F\u5BFC\u51FA\u7684\u6587\u4EF6\u5939": "Only folders successfully exported by this running server can be opened.",
      "\u4EC5\u5141\u8BB8\u672C\u5730\u9875\u9762\u53D1\u8D77\u4FEE\u6539\u64CD\u4F5C": "Only local pages may request changes.",
      "\u8BF7\u4F7F\u7528 JSON \u8BF7\u6C42": "A JSON request is required.",
      "\u8BF7\u6C42\u5927\u5C0F\u65E0\u6548": "Invalid request size.",
      "\u8BF7\u6C42\u683C\u5F0F\u65E0\u6548": "Invalid request format.",
      "\u63A5\u53E3\u4E0D\u5B58\u5728": "Endpoint not found.",
      "git \u547D\u4EE4\u5931\u8D25": "Git command failed.",
      "\u6587\u4EF6\u5939\u4E0D\u5B58\u5728: ": "Folder not found: ",
      "\u63D0\u4EA4\u5305\u542B Windows \u4E0D\u652F\u6301\u7684\u6587\u4EF6\u8DEF\u5F84\uFF1A": "The commit contains a path unsupported by Windows: ",
      "\u65E0\u6CD5\u8BFB\u53D6\u63D0\u4EA4\u6587\u4EF6\uFF1A": "Could not read committed file: ",
      "\u7B26\u53F7\u94FE\u63A5\u6307\u5411\u5BFC\u51FA\u76EE\u5F55\u4E4B\u5916\uFF1A": "A symbolic link points outside the export folder: ",
      "\u8BFB\u53D6\u6587\u4EF6\u5185\u5BB9\u4E2D\u65AD\uFF1A": "File content read interrupted: "
    };
    let language = "zh-CN";
    try {
      if (localStorage.getItem("dsh.git-tree-viz.language") === "en") language = "en";
    } catch {
    }
    function t2(key, values = {}) {
      const text = language === "en" ? en2[key] ?? key : key;
      return text.replace(/\{(\w+)\}/g, (all, name2) => values[name2] === void 0 ? all : String(values[name2]));
    }
    function message(text) {
      if (language !== "en") return text;
      if (en2[text]) return en2[text];
      const submodule = /^包含 (\d+) 个子模块：仅创建空目录，不下载子模块内容。$/.exec(text);
      if (submodule) return t2("\u5305\u542B {count} \u4E2A\u5B50\u6A21\u5757\uFF1A\u4EC5\u521B\u5EFA\u7A7A\u76EE\u5F55\uFF0C\u4E0D\u4E0B\u8F7D\u5B50\u6A21\u5757\u5185\u5BB9\u3002", { count: submodule[1] });
      for (const prefix of ["\u6587\u4EF6\u5939\u4E0D\u5B58\u5728: ", "\u63D0\u4EA4\u5305\u542B Windows \u4E0D\u652F\u6301\u7684\u6587\u4EF6\u8DEF\u5F84\uFF1A", "\u65E0\u6CD5\u8BFB\u53D6\u63D0\u4EA4\u6587\u4EF6\uFF1A", "\u7B26\u53F7\u94FE\u63A5\u6307\u5411\u5BFC\u51FA\u76EE\u5F55\u4E4B\u5916\uFF1A", "\u8BFB\u53D6\u6587\u4EF6\u5185\u5BB9\u4E2D\u65AD\uFF1A"]) {
        if (text.startsWith(prefix)) return en2[prefix] + text.slice(prefix.length);
      }
      return text;
    }
    function apply2(root2 = document) {
      root2.querySelectorAll("[data-i18n]").forEach((node) => {
        node.textContent = t2(node.dataset.i18n);
      });
      for (const attribute of ["placeholder", "title", "aria-label"]) {
        root2.querySelectorAll(`[data-i18n-${attribute}]`).forEach((node) => {
          node.setAttribute(attribute, t2(node.getAttribute(`data-i18n-${attribute}`)));
        });
      }
      document.documentElement.lang = language;
      document.title = t2("Git Tree \xB7 \u63D0\u4EA4\u5386\u53F2");
    }
    return { t: t2, message, apply: apply2, get locale() {
      return language;
    }, setLocale(value) {
      language = value === "en" ? "en" : "zh-CN";
      try {
        localStorage.setItem("dsh.git-tree-viz.language", language);
      } catch {
      }
    } };
  })();
  "use strict";
  const t = I18N.t;
  const ROW = 54, LANE = 25, LEFT = 24, PAD = 26;
  const COLORS = ["#a5d9bb", "#b5a0dd", "#e2bc84", "#83bbd1", "#dc9eb5", "#bac97b"];
  const $ = (id) => document.getElementById(id);
  const el = Object.fromEntries(["graph", "scroller", "repoInput", "loadBtn", "stats", "detail", "detailContent", "status", "searchInput"].map((id) => [id, $(id)]));
  const state = { data: null, layout: null, selected: -1, matches: [], matchIndex: -1, parent: 0, file: "", request: 0, loading: false, filters: /* @__PURE__ */ new Set() };
  Object.assign(state, {
    sourceCommits: [],
    sourceLayout: null,
    sort: "date-desc",
    metrics: null,
    metricsPromise: null,
    sortRequest: 0,
    generation: 0,
    exportBusy: false,
    lastExport: null,
    writeToken: "",
    accessBusy: false,
    tagBusy: false
  });
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[m]);
  const color = (lane) => COLORS[lane % COLORS.length];
  const yOf = (row) => PAD + row * ROW + ROW / 2;
  const xOf = (lane) => LEFT + lane * LANE;
  const short = (hash) => hash.slice(0, 8);
  const COMMIT_TYPES = {
    feat: { color: "#a5d9bb", label: "\u65B0\u529F\u80FD" },
    fix: { color: "#ec9a95", label: "\u4FEE\u590D" },
    refactor: { color: "#bda4e8", label: "\u91CD\u6784" },
    perf: { color: "#e7b176", label: "\u6027\u80FD" },
    docs: { color: "#8cbce8", label: "\u6587\u6863" },
    test: { color: "#85d0d0", label: "\u6D4B\u8BD5" },
    chore: { color: "#a1aab4", label: "\u7EF4\u62A4" },
    build: { color: "#a1aab4", label: "\u6784\u5EFA" },
    ci: { color: "#a1aab4", label: "\u6301\u7EED\u96C6\u6210" }
  };
  function commitType(commit) {
    const match = /^(feat|fix|refactor|perf|docs|test|chore|build|ci)(?:\([^\r\n)]+\))?(!)?:\s*/i.exec(commit.subject || "");
    const type = match ? match[1].toLowerCase() : "";
    return {
      type,
      prefix: match ? match[0] : "",
      ...COMMIT_TYPES[type],
      breaking: !!match?.[2] || /^BREAKING[ -]CHANGE:\s*\S/m.test(commit.body || "")
    };
  }
  function typedTitle(commit) {
    const info = commitType(commit);
    return info.type ? `<tspan fill="${info.color}" font-weight="600">${esc(info.prefix)}</tspan>${esc(commit.subject.slice(info.prefix.length))}` : esc(commit.subject || t("\uFF08\u65E0\u6807\u9898\uFF09"));
  }
  function typeBadges(commit) {
    const info = commitType(commit);
    return `${info.type ? `<span class="type-badge" style="--type-color:${info.color}">${info.type} \xB7 ${t(info.label)}</span>` : ""}${info.breaking ? `<span class="type-badge breaking-badge">! ${t("\u7834\u574F\u6027\u53D8\u66F4")}</span>` : ""}`;
  }
  function matchesTypeFilter(commit) {
    if (!state.filters.size) return true;
    const info = commitType(commit);
    return state.filters.has(info.type) || state.filters.has("breaking") && info.breaking;
  }
  function renderTypeFilters() {
    const options = {
      all: { label: "\u5168\u90E8", color: "#a1aab4" },
      ...COMMIT_TYPES,
      breaking: { label: "\u7834\u574F\u6027\u53D8\u66F4", color: "#ec9a95" }
    };
    $("typeFilters").innerHTML = Object.entries(options).map(([type, info]) => {
      const active = type === "all" ? !state.filters.size : state.filters.has(type);
      return `<button type="button" class="filter-chip" data-type="${type}" aria-pressed="${active}" style="--type-color:${info.color}" title="${t(info.label)}${type === "all" ? t("\uFF1A\u6E05\u9664\u7C7B\u578B\u7B5B\u9009") : t("\uFF1A\u70B9\u51FB\u5207\u6362\uFF0C\u53EF\u591A\u9009")}">${type === "all" ? t("\u5168\u90E8") : type === "breaking" ? "! BREAKING" : type}</button>`;
    }).join("");
    const total = state.data?.commits.length || 0;
    const count = state.filters.size ? (state.data?.commits || []).filter(matchesTypeFilter).length : total;
    $("filterCount").textContent = state.filters.size ? `${count}/${total}` : "";
    $("filterCount").title = state.filters.size ? t("{count} \u4E2A\u63D0\u4EA4\u5339\u914D\uFF0C\u5176\u4ED6\u63D0\u4EA4\u6697\u663E", { count }) : "";
  }
  const SORT_LABELS = {
    "date-desc": "\u4ECE\u65B0\u5230\u65E7 \u2193",
    "date-asc": "\u4ECE\u65E7\u5230\u65B0 \u2191",
    "edits-desc": "\u7F16\u8F91\u91CF\uFF1A\u4ECE\u5927\u5230\u5C0F \u2193",
    "edits-asc": "\u7F16\u8F91\u91CF\uFF1A\u4ECE\u5C0F\u5230\u5927 \u2191",
    "files-desc": "\u6D89\u53CA\u6587\u4EF6\uFF1A\u4ECE\u591A\u5230\u5C11 \u2193",
    "files-asc": "\u6D89\u53CA\u6587\u4EF6\uFF1A\u4ECE\u5C11\u5230\u591A \u2191"
  };
  function sortCommits(commits, mode, metrics = {}) {
    const [key, direction] = mode.split("-");
    const sign = direction === "asc" ? 1 : -1;
    const value = (c) => key === "date" ? Date.parse(c.date) || 0 : metrics[c.hash]?.[key] || 0;
    return [...commits].sort((a, b) => sign * (value(a) - value(b)));
  }
  function layoutForOrder(commits, sourceLayout) {
    const rowOf = new Map(commits.map((c, i) => [c.hash, i]));
    const assign = commits.map((c) => sourceLayout.assign[sourceLayout.rowOf.get(c.hash)]);
    const edges = [];
    commits.forEach((c, from) => c.parents.forEach((p, k) => {
      if (rowOf.has(p)) edges.push({ from, to: rowOf.get(p), merge: k > 0 });
    }));
    return { ...sourceLayout, rowOf, assign, edges };
  }
  function applySort(mode) {
    const selectedHash = state.data.commits[state.selected]?.hash;
    state.data.commits = sortCommits(state.sourceCommits, mode, state.metrics || {});
    state.layout = layoutForOrder(state.data.commits, state.sourceLayout);
    state.selected = selectedHash ? state.layout.rowOf.get(selectedHash) ?? -1 : -1;
    state.sort = mode;
    $("sortSelect").value = mode;
    const timeSort = mode.startsWith("date-");
    $("mainLabel").textContent = timeSort ? `\u2442 ${state.data.main_branch || "HEAD"} / ${t("\u4E3B\u7EBF")}` : `${t("\u63D0\u4EA4\u5217\u8868")} / ${mode.startsWith("edits-") ? t("\u7F16\u8F91\u91CF") : t("\u6587\u4EF6\u6570")}`;
    if (state.selected >= 0) $("detailIndex").textContent = `${state.selected + 1} / ${state.data.commits.length}`;
    search(false);
    el.scroller.scrollTop = 0;
    scheduleRender();
  }
  async function changeSort(mode) {
    if (!state.data || state.loading || !SORT_LABELS[mode]) return;
    const request = ++state.sortRequest;
    const generation = state.generation;
    try {
      if (!mode.startsWith("date-") && !state.metrics) {
        $("sortStatus").textContent = t("\u7EDF\u8BA1\u53D8\u66F4\u91CF\u2026");
        if (!state.metricsPromise) {
          state.metricsPromise = api("/api/metrics?repo=" + encodeURIComponent(state.data.repo));
        }
        const metrics = await state.metricsPromise;
        if (generation !== state.generation) return;
        if (state.sourceCommits.some((c) => !metrics[c.hash])) {
          throw new Error(t("\u4ED3\u5E93\u5386\u53F2\u5DF2\u53D8\u5316\uFF0C\u8BF7\u91CD\u65B0\u6253\u5F00\u4ED3\u5E93\u540E\u6392\u5E8F\u3002"));
        }
        state.metrics = metrics;
      }
      if (request !== state.sortRequest || generation !== state.generation) return;
      applySort(mode);
    } catch (err) {
      if (request !== state.sortRequest || generation !== state.generation) return;
      state.metricsPromise = null;
      $("sortSelect").value = state.sort;
      toast(t("\u6392\u5E8F\u5931\u8D25\uFF1A") + err.message, true);
    } finally {
      if (request === state.sortRequest) $("sortStatus").textContent = "";
    }
  }
  let toastTimer, renderFrame;
  function toast(message, error = false) {
    clearTimeout(toastTimer);
    el.status.textContent = message;
    el.status.classList.remove("hidden");
    el.status.style.borderColor = error ? "#975c62" : "";
    toastTimer = setTimeout(() => el.status.classList.add("hidden"), error ? 7e3 : 2600);
  }
  function computeLayout(commits, mainHash) {
    const rowOf = new Map(commits.map((c, i) => [c.hash, i]));
    const mainline = /* @__PURE__ */ new Set();
    let hash = mainHash;
    while (rowOf.has(hash) && !mainline.has(hash)) {
      mainline.add(hash);
      hash = commits[rowOf.get(hash)].parents[0];
    }
    const active = [mainHash], assign = [], edges = [];
    let maxLane = 0;
    function free() {
      for (let i = 1; i < active.length; i++) if (!active[i]) return i;
      active.push(null);
      return active.length - 1;
    }
    commits.forEach((c, row) => {
      let lane = mainline.has(c.hash) ? 0 : active.findIndex((h, i) => i > 0 && h === c.hash);
      if (lane < 0) lane = free();
      active.forEach((h, i) => {
        if (h === c.hash) active[i] = null;
      });
      assign[row] = lane;
      maxLane = Math.max(maxLane, lane);
      c.parents.forEach((p, k) => {
        if (mainline.has(p)) {
          active[0] = p;
          return;
        }
        if (active.includes(p)) return;
        const pl = k === 0 && lane !== 0 ? lane : free();
        active[pl] = p;
        maxLane = Math.max(maxLane, pl);
      });
    });
    commits.forEach((c, row) => c.parents.forEach((p, k) => {
      if (rowOf.has(p)) edges.push({ from: row, to: rowOf.get(p), merge: k > 0 });
    }));
    const children = /* @__PURE__ */ new Map();
    commits.forEach((c) => c.parents.forEach((p) => {
      if (!children.has(p)) children.set(p, []);
      children.get(p).push(c.hash);
    }));
    return { assign, rowOf, maxLane, edges, children, mainline };
  }
  function scheduleRender() {
    if (renderFrame) return;
    renderFrame = requestAnimationFrame(() => {
      renderFrame = null;
      render();
    });
  }
  function render() {
    if (!state.data?.commits.length) {
      el.graph.innerHTML = "";
      return;
    }
    const { commits } = state.data, { assign, maxLane, edges } = state.layout;
    const timeSort = state.sort.startsWith("date-");
    const width = el.scroller.clientWidth;
    const origin = Math.max(18, width * 0.4 - LEFT);
    el.graph.style.left = `${origin}px`;
    const textX = xOf(timeSort ? maxLane + 1 : 1) + 20;
    const textWidth = Math.max(200, width - origin - textX - 24);
    const svgWidth = textX + textWidth + 24;
    el.graph.setAttribute("width", svgWidth);
    el.graph.setAttribute("height", PAD * 2 + commits.length * ROW);
    const start = Math.max(0, Math.floor((el.scroller.scrollTop - PAD) / ROW) - 10);
    const end = Math.min(commits.length, Math.ceil((el.scroller.scrollTop + el.scroller.clientHeight) / ROW) + 10);
    const selected = state.selected, related = /* @__PURE__ */ new Set([selected]);
    const filtering = state.filters.size > 0;
    const typeMatches = filtering ? commits.map(matchesTypeFilter) : null;
    if (selected >= 0) {
      const c = commits[selected];
      [...c.parents, ...state.layout.children.get(c.hash) || []].forEach((h) => related.add(state.layout.rowOf.get(h)));
    }
    const edgeParts = [];
    for (const e of timeSort ? edges : []) {
      if (Math.max(e.from, e.to) < start || Math.min(e.from, e.to) >= end) continue;
      const x1 = xOf(assign[e.from]), x2 = xOf(assign[e.to]);
      const y1 = yOf(e.from), y2 = yOf(e.to), dy = y2 - y1;
      const d = x1 === x2 ? `M${x1} ${y1}V${y2}` : `M${x1} ${y1}C${x1} ${y1 + dy * 0.42} ${x2} ${y2 - dy * 0.42} ${x2} ${y2}`;
      const linked = e.from === selected || e.to === selected;
      const edgeOpacity = filtering ? typeMatches[e.from] || typeMatches[e.to] ? 0.85 : 0.1 : selected < 0 || linked ? 0.85 : 0.3;
      edgeParts.push(`<path d="${d}" fill="none" stroke="${color(assign[e.from])}" stroke-width="${linked ? 2.8 : 1.7}" opacity="${edgeOpacity}"${e.merge ? ' stroke-dasharray="4 3"' : ""}/>`);
    }
    const rows = [], matchSet = new Set(state.matches);
    for (let row = start; row < end; row++) {
      const c = commits[row], x = xOf(timeSort ? assign[row] : 0), y = yOf(row), isSelected = selected === row;
      const isRoot = c.parents.length === 0, isMerge = c.parents.length > 1;
      const refText = (c.refs || []).map((r) => r.name).join(" \xB7 ");
      const date = (c.date || "").slice(0, 10);
      const opacity = filtering ? 1 : selected < 0 || related.has(row) ? 1 : 0.7;
      const filterHit = filtering && typeMatches[row];
      const rowOpacity = filtering && !filterHit ? isSelected ? 0.5 : 0.22 : 1;
      const kind = commitType(c);
      const badgeWidth = kind.type ? kind.type.length * 6 + 16 : 0;
      const metric = state.metrics?.[c.hash];
      const metricText = metric && !state.sort.startsWith("date-") ? ` \xB7 +${metric.additions} \u2212${metric.deletions} \xB7 ${metric.files} ${t("\u6587\u4EF6")}` : "";
      rows.push(`<g class="commit-row${isSelected ? " selected" : ""}${matchSet.has(row) ? " matched" : ""}${filterHit ? " filter-hit" : ""}" data-row="${row}" opacity="${rowOpacity}">
      <title>${esc(c.subject)}
${esc(c.author)} \xB7 ${esc(date)}
${c.hash}${refText ? "\n" + esc(refText) : ""}</title>
      <rect class="row-bg" x="${-Math.min(origin, 160)}" y="${y - ROW / 2 + 3}" width="${svgWidth + Math.min(origin, 160) - 6}" height="${ROW - 6}" rx="7" fill="transparent"/>
      ${isSelected ? `<circle cx="${x}" cy="${y}" r="12" fill="${color(assign[row])}" opacity=".13"/>` : ""}
      ${isRoot ? `<rect x="${x - 4}" y="${y - 4}" width="8" height="8" rx="2" fill="${color(assign[row])}"/>` : `<circle cx="${x}" cy="${y}" r="${isMerge ? 5.5 : 4}" fill="${isMerge ? "var(--bg)" : color(assign[row])}" stroke="${color(assign[row])}" stroke-width="2"/>`}
      <g opacity="${opacity}">
      <text x="${textX}" y="${y - 5}" font-size="12" fill="${isSelected ? "var(--text)" : "var(--text)"}" clip-path="url(#titleClip)">${typedTitle(c)}</text>
      ${kind.type ? `<rect x="${textX}" y="${y + 2}" width="${badgeWidth}" height="16" rx="4" fill="${kind.color}" fill-opacity=".12"/><text x="${textX + 8}" y="${y + 13}" font-size="9" font-family="Consolas,monospace" fill="${kind.color}">${kind.type}</text>` : ""}
      <text x="${textX + (badgeWidth ? badgeWidth + 8 : 0)}" y="${y + 13}" font-size="9" fill="#88959d" font-family="Consolas,monospace" clip-path="url(#titleClip)">${kind.breaking ? '<tspan fill="#ec9a95">! BREAKING \xB7 </tspan>' : ""}${metricText ? `<tspan fill="#b8c9bf">${esc(metricText.slice(3))}</tspan> \xB7 ` : ""}<tspan fill="${color(assign[row])}">${short(c.hash)}</tspan> \xB7 ${esc(c.author)} \xB7 ${date}${refText ? ` \xB7 ${esc(refText)}` : ""}</text>
      ${c.hash === state.data.head_hash ? `<text x="${x - 14}" y="${y + 3}" text-anchor="end" fill="#a5d9bb" font-size="8" font-family="Consolas,monospace">HEAD</text>` : ""}
      </g></g>`);
    }
    el.graph.innerHTML = `<defs><clipPath id="titleClip"><rect x="${textX}" y="0" width="${textWidth}" height="${PAD * 2 + commits.length * ROW}"/></clipPath></defs><g pointer-events="none">${edgeParts.join("")}</g>${rows.join("")}`;
  }
  function jump(row) {
    if (row == null || row < 0) return;
    el.scroller.scrollTo({ top: Math.max(0, yOf(row) - el.scroller.clientHeight / 3), left: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }
  function closeDetail() {
    state.selected = -1;
    state.request++;
    document.body.classList.remove("detail-open");
    el.detail.inert = true;
    el.scroller.focus({ preventScroll: true });
    scheduleRender();
  }
  function dateLabel(date) {
    const d = new Date(date);
    return Number.isNaN(d.getTime()) ? date : d.toLocaleString(I18N.locale, { hour12: false });
  }
  function selectCommit(row, navigate = false, restore = null) {
    if (row < 0 || row >= (state.data?.commits.length || 0)) return;
    state.selected = row;
    state.parent = restore?.parent ?? 0;
    state.file = restore?.file || "";
    state.request++;
    const c = state.data.commits[row], children = state.layout.children.get(c.hash) || [];
    const relations = (hashes, label) => hashes.length ? `<div class="section-heading">${t(label)}<small>${hashes.length} ${t("\u4E2A")}</small></div><div class="relation-list">${hashes.map((h) => `<button class="relation" data-hash="${h}" title="${esc(state.data.commits[state.layout.rowOf.get(h)]?.subject || h)}"${state.layout.rowOf.has(h) ? "" : " disabled"}>\u2197 ${short(h)}</button>`).join("")}</div>` : "";
    $("detailIndex").textContent = `${row + 1} / ${state.data.commits.length}`;
    el.detailContent.innerHTML = `<div class="commit-kind">${c.parents.length > 1 ? t("MERGE COMMIT / \u5408\u5E76\u63D0\u4EA4") : c.parents.length === 0 ? t("ROOT COMMIT / \u6839\u63D0\u4EA4") : t("COMMIT / \u63D0\u4EA4")}</div>
    <h2>${esc(c.subject || t("\uFF08\u65E0\u6807\u9898\uFF09"))}</h2>
    ${typeBadges(c) ? `<div class="type-badges">${typeBadges(c)}</div>` : ""}
    <div id="detailRefs" class="ref-list">${refBadges(c)}</div>
    <button class="hash-button" id="copyHash" title="${c.hash}">${short(c.hash)}<small>${t("\u590D\u5236\u5B8C\u6574\u54C8\u5E0C \u29C9")}</small></button>
    <form id="tagForm" class="tag-form" data-hash="${c.hash}" data-repo="${esc(state.data.repo)}">
      <fieldset class="tag-fields"${!state.writeToken || state.tagBusy ? " disabled" : ""}><label for="tagName">${t("\u672C\u5730\u6807\u7B7E")}</label><div class="tag-input-row"><input id="tagName" name="tagName" required spellcheck="false" placeholder="${t("\u4F8B\u5982 v1.0 \u6216 review/important")}" aria-label="${t("\u65B0\u6807\u7B7E\u540D\u79F0")}"><button type="submit">${t("\u6253\u6807\u7B7E")}</button></div></fieldset>
      <p class="tag-mode-hint">${state.writeToken ? t("\u6807\u7B7E\u4FDD\u5B58\u5728\u672C\u5730\uFF0C\u987B\u624B\u52A8\u63A8\u9001\u5230\u8FDC\u7AEF\u3002") : t("\u6253\u6807\u7B7E\u524D\uFF0C\u8BF7\u5728\u53F3\u4E0A\u89D2\u5F00\u542F\u201C\u6E90\u4ED3\u5E93\u8BFB\u5199\u201D\u3002")}</p><div class="tag-feedback" role="status"></div>
    </form>
    <dl class="meta-grid"><dt>${t("\u4F5C\u8005")}</dt><dd>${esc(c.author)}<small>${esc(c.email)}</small></dd><dt>${t("\u65F6\u95F4")}</dt><dd>${esc(dateLabel(c.date))}<small>${esc(c.date)}</small></dd></dl>
    ${c.body ? `<div class="body">${esc(c.body)}</div>` : ""}
    <details class="export-panel" id="exportPanel"><summary>\u2197 ${t("\u5BFC\u51FA\u6B64\u7248\u672C")}</summary>
      <form id="exportForm" data-hash="${c.hash}" data-repo="${esc(state.data.repo)}">
        <p class="muted">${t("\u5BFC\u51FA {hash} \u8BB0\u5F55\u7684\u72B6\u6001\uFF0C\u4E0D\u5305\u542B\u5DE5\u4F5C\u533A\u672A\u63D0\u4EA4\u7684\u4FEE\u6539\u3002", { hash: short(c.hash) })}</p>
        <label class="export-field" for="exportDestination">${t("\u76EE\u6807\u6587\u4EF6\u5939")}<input id="exportDestination" name="destination" required spellcheck="false" value="${esc(state.data.repo.replace(/[\\/]+$/, "") + "-" + short(c.hash))}" placeholder="${t("\u8F93\u5165\u76EE\u6807\u6587\u4EF6\u5939\u7684\u7EDD\u5BF9\u8DEF\u5F84")}"></label>
        <p class="export-hint">${t("\u76EE\u5F55\u987B\u4E0D\u5B58\u5728\u6216\u4E3A\u7A7A\uFF0C\u4E0A\u7EA7\u76EE\u5F55\u987B\u5DF2\u5B58\u5728\u3002")}</p>
        <label class="export-checkbox"><input id="exportIncludeGit" type="checkbox"> ${t("\u4FDD\u7559 .git\uFF0C\u5EFA\u7ACB\u72EC\u7ACB\u4ED3\u5E93")}</label>
        <p class="export-hint" id="exportModeHint">${t("\u4EC5\u5BFC\u51FA\u63D0\u4EA4\u4E2D\u7684\u6587\u4EF6\uFF0C\u4E0D\u9644\u5E26 Git \u5386\u53F2\u3002")}</p>
        <div id="exportBranchField" hidden><label class="export-field" for="exportBranch">${t("\u65B0\u5206\u652F\u540D\u79F0\uFF08\u53EF\u9009\uFF09")}<input id="exportBranch" spellcheck="false" placeholder="${t("\u4F8B\u5982 review/version")}"></label><p class="export-hint">${t("\u7559\u7A7A\u65F6\u505C\u7559\u5728\u6B64\u63D0\u4EA4\uFF08detached HEAD\uFF09\u3002")}</p></div>
        <div id="exportWarnings" class="export-notes" role="status"></div>
        <button type="submit" class="export-submit" disabled>${state.exportBusy ? t("\u5DF2\u6709\u5BFC\u51FA\u4EFB\u52A1\u8FDB\u884C\u4E2D\u2026") : t("\u5BFC\u51FA\u5230\u76EE\u6807\u6587\u4EF6\u5939")}</button>
        <div class="export-result" id="exportResult" role="status">${state.lastExport?.hash === c.hash && state.lastExport.repo === state.data.repo ? exportResultMarkup(state.lastExport) : ""}</div>
      </form></details>
    ${relations(c.parents, t("\u7236\u63D0\u4EA4"))}${relations(children, t("\u5B50\u63D0\u4EA4"))}
    <div class="section-heading">${t("\u6587\u4EF6\u53D8\u66F4")} <div id="changeSummary" class="change-summary"></div></div>
    <div class="comparison">${t("\u6BD4\u8F83\u57FA\u51C6")} ${c.parents.length > 1 ? `<select id="parentSelect" aria-label="${t("\u9009\u62E9\u6BD4\u8F83\u7684\u7236\u63D0\u4EA4")}">${c.parents.map((p, i) => `<option value="${i}">${t("\u7236\u63D0\u4EA4 {number} \xB7 {hash}", { number: i + 1, hash: short(p) })}</option>`).join("")}</select>` : c.parents.length ? short(c.parents[0]) : t("\u7A7A\u76EE\u5F55\uFF08\u521D\u59CB\u63D0\u4EA4\uFF09")}</div>
    <div id="changes"><div class="loading">${t("\u6B63\u5728\u8BFB\u53D6\u53D8\u66F4\u2026")}</div></div>`;
    if (restore) {
      $("exportDestination").value = restore.destination;
      $("exportIncludeGit").checked = restore.includeGit;
      $("exportBranch").value = restore.branch;
      $("tagName").value = restore.tagName;
      $("exportBranchField").hidden = !restore.includeGit;
      $("exportModeHint").textContent = restore.includeGit ? t("\u590D\u5236\u72EC\u7ACB\u7684 Git \u5386\u53F2\u5E76\u68C0\u51FA\u6B64\u63D0\u4EA4\uFF0C\u4E0D\u4F9D\u8D56\u6E90\u4ED3\u5E93\u7684\u5BF9\u8C61\u6587\u4EF6\u3002") : t("\u4EC5\u5BFC\u51FA\u63D0\u4EA4\u4E2D\u7684\u6587\u4EF6\uFF0C\u4E0D\u9644\u5E26 Git \u5386\u53F2\u3002");
      if ($("parentSelect")) $("parentSelect").value = state.parent;
      $("exportPanel").open = restore.exportOpen;
    }
    el.detailContent.scrollTop = 0;
    document.body.classList.add("detail-open");
    el.detail.inert = false;
    if (navigate) jump(row);
    scheduleRender();
    loadChanges(state.file);
  }
  async function api(url, options) {
    const res = await fetch(url, options);
    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      if (res.status === 404 && url.startsWith("/api/commit")) {
        throw new Error(t("\u5F53\u524D\u8FD0\u884C\u7684\u662F\u65E7\u7248\u540E\u7AEF\uFF0C\u5C1A\u4E0D\u652F\u6301\u63D0\u4EA4\u8BE6\u60C5\u3002\u8BF7\u91CD\u542F server.py\uFF0C\u6216\u6253\u5F00\u65B0\u7248\u9884\u89C8 http://127.0.0.1:8770\u3002"));
      }
      throw new Error(t("\u670D\u52A1\u672A\u8FD4\u56DE\u6709\u6548\u7684 JSON \u6570\u636E\uFF08HTTP {status}\uFF09\uFF0C\u8BF7\u786E\u8BA4\u5DF2\u542F\u52A8\u65B0\u7248 server.py\u3002", { status: res.status }));
    }
    const json = await res.json();
    if (!res.ok || !json.ok) throw new Error(I18N.message(json.error || "") || t("\u8BF7\u6C42\u5931\u8D25 ({status})", { status: res.status }));
    return json.data;
  }
  function post(url, body) {
    return api(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  }
  function refBadges(commit) {
    return (commit.refs || []).map((r) => `<span class="ref-pill ${r.kind}">${esc(r.name)}</span>`).join("");
  }
  function renderRepoStats() {
    if (!state.data) return;
    el.stats.innerHTML = [["commits", "\u63D0\u4EA4"], ["branches", "\u5206\u652F"], ["tags", "\u6807\u7B7E"], ["merges", "\u5408\u5E76"]].map(([key, label]) => `<div class="stat"><b>${state.data.stats[key].toLocaleString(I18N.locale)}</b><span>${t(label)}</span></div>`).join("");
  }
  function updateAccessUI() {
    if (pendingRepository !== null && !state.loading && !state.tagBusy) {
      const next = pendingRepository;
      pendingRepository = null;
      loadGraph(next);
    }
    if (pendingLocale && !state.tagBusy && !state.exportBusy && !state.accessBusy) {
      const next = pendingLocale;
      pendingLocale = null;
      setLanguage(next);
    }
    const writing = !!state.writeToken;
    $("languageSelect").disabled = state.tagBusy || state.exportBusy || state.accessBusy;
    $("sourceAccessLabel").textContent = writing ? t("\u6E90\u4ED3\u5E93\u8BFB\u5199") : t("\u6E90\u4ED3\u5E93\u53EA\u8BFB");
    $("sourceAccessBtn").setAttribute("aria-pressed", String(writing));
    $("sourceAccessBtn").classList.toggle("write-enabled", writing);
    $("sourceAccessBtn").disabled = !state.data || state.loading || state.tagBusy || state.accessBusy;
    const owned = state.data?.owned_tags?.length || 0;
    $("ownedTagCount").textContent = owned;
    $("undoTagsBtn").disabled = !writing || !owned || state.tagBusy || state.loading;
    document.querySelectorAll(".tag-fields").forEach((fieldset) => {
      fieldset.disabled = !writing || state.tagBusy || state.loading;
    });
    document.querySelectorAll(".tag-mode-hint").forEach((hint) => {
      hint.textContent = writing ? t("\u6807\u7B7E\u4FDD\u5B58\u5728\u672C\u5730\uFF0C\u987B\u624B\u52A8\u63A8\u9001\u5230\u8FDC\u7AEF\u3002") : t("\u6253\u6807\u7B7E\u524D\uFF0C\u8BF7\u5728\u53F3\u4E0A\u89D2\u5F00\u542F\u201C\u6E90\u4ED3\u5E93\u8BFB\u5199\u201D\u3002");
    });
  }
  function resetWriteAccess() {
    const token = state.writeToken, repo = state.data?.repo;
    state.writeToken = "";
    if (token && repo) post("/api/write-access", { repo, token, enabled: false }).catch(() => {
    });
    if ($("writeAccessDialog").open) $("writeAccessDialog").close();
    updateAccessUI();
  }
  async function enableWriteAccess() {
    const repo = $("writeAccessDialog").dataset.repo;
    if (!state.data || repo !== state.data.repo || state.loading || state.tagBusy || state.accessBusy) return;
    const generation = state.generation;
    state.accessBusy = true;
    $("enableWriteBtn").disabled = true;
    $("writeAccessError").textContent = "";
    try {
      const result = await post("/api/write-access", { repo, enabled: true });
      if (repo !== state.data?.repo || generation !== state.generation || !$("writeAccessDialog").open) {
        post("/api/write-access", { repo, token: result.token, enabled: false }).catch(() => {
        });
        return;
      }
      state.writeToken = result.token;
      $("writeAccessDialog").close();
      toast(t("\u5DF2\u5F00\u542F\u6E90\u4ED3\u5E93\u8BFB\u5199\uFF0C\u53EF\u521B\u5EFA\u6216\u64A4\u56DE\u672C\u5730\u6807\u7B7E"));
    } catch (err) {
      $("writeAccessError").textContent = err.message;
    } finally {
      state.accessBusy = false;
      $("enableWriteBtn").disabled = false;
      updateAccessUI();
    }
  }
  function syncTagReferences(result, repo) {
    if (repo !== state.data?.repo) return;
    state.data.refs = result.refs;
    state.data.owned_tags = result.owned_tags;
    for (const commit of state.sourceCommits) commit.refs = result.commit_refs[commit.hash] || [];
    state.data.stats.tags = result.refs.filter((ref) => ref.kind === "tag").length;
    const selected = state.data.commits[state.selected];
    if (selected && $("detailRefs")) $("detailRefs").innerHTML = refBadges(selected);
    renderRepoStats();
    updateAccessUI();
    search(false);
    scheduleRender();
  }
  async function createSelectedTag(form) {
    if (state.tagBusy || state.loading) return;
    if (!state.writeToken) {
      toast(t("\u8BF7\u5148\u5728\u53F3\u4E0A\u89D2\u5F00\u542F\u6E90\u4ED3\u5E93\u8BFB\u5199"), true);
      return;
    }
    const name2 = form.querySelector("input[name=tagName]").value.trim();
    if (!name2) return;
    const repo = form.dataset.repo;
    if (repo !== state.data?.repo) return;
    const feedback = form.querySelector(".tag-feedback");
    state.tagBusy = true;
    feedback.textContent = t("\u6B63\u5728\u521B\u5EFA\u6807\u7B7E\u2026");
    updateAccessUI();
    try {
      const result = await post("/api/tags/create", { repo, hash: form.dataset.hash, name: name2, token: state.writeToken });
      syncTagReferences(result, repo);
      feedback.textContent = t("\u5DF2\u521B\u5EFA\u672C\u5730\u6807\u7B7E\uFF1A") + result.name;
      form.querySelector("input[name=tagName]").value = "";
      toast(t("\u5DF2\u6253\u6807\u7B7E\uFF1A") + result.name);
    } catch (err) {
      feedback.textContent = t("\u521B\u5EFA\u5931\u8D25\uFF1A") + err.message;
      if (!form.isConnected) toast(t("\u521B\u5EFA\u6807\u7B7E\u5931\u8D25\uFF1A") + err.message, true);
    } finally {
      state.tagBusy = false;
      updateAccessUI();
    }
  }
  async function undoSoftwareTags() {
    if (state.tagBusy || state.loading || !state.writeToken || !state.data?.owned_tags?.length) return;
    const repo = state.data.repo;
    state.tagBusy = true;
    updateAccessUI();
    try {
      const result = await post("/api/tags/undo-all", { repo, token: state.writeToken });
      syncTagReferences(result, repo);
      const message = t("\u5DF2\u64A4\u56DE {count} \u4E2A\u672C\u8F6F\u4EF6\u6807\u7B7E", { count: result.removed.length }) + (result.skipped.length ? t("\uFF1B\u8DF3\u8FC7 {count} \u4E2A\u5DF2\u88AB\u4FEE\u6539\u7684\u6807\u7B7E\uFF1A", { count: result.skipped.length }) + result.skipped.join(", ") : "");
      toast(message, !!result.skipped.length);
    } catch (err) {
      toast(t("\u64A4\u56DE\u6807\u7B7E\u5931\u8D25\uFF1A") + err.message, true);
    } finally {
      state.tagBusy = false;
      updateAccessUI();
    }
  }
  function exportResultMarkup(result) {
    return `<div class="export-success">\u2713 ${t("\u5DF2\u5BFC\u51FA")} ${short(result.hash)} \xB7 ${result.include_git ? t("\u72EC\u7ACB Git \u4ED3\u5E93") : t("\u7EAF\u6587\u4EF6\u5FEB\u7167")}${result.branch ? " \xB7 " + esc(result.branch) : ""}<code>${esc(result.path)}</code><button type="button" class="quiet-button open-export" data-path="${esc(result.path)}">${t("\u6253\u5F00\u6587\u4EF6\u5939")} \u2197</button></div>`;
  }
  async function prepareExport(panel) {
    const form = panel.querySelector("form");
    if (!form || form.dataset.ready || form.dataset.checking) return;
    form.dataset.checking = "true";
    const notes = form.querySelector(".export-notes");
    notes.textContent = t("\u6B63\u5728\u68C0\u67E5\u6B64\u7248\u672C\u7684\u5BFC\u51FA\u8303\u56F4\u2026");
    try {
      const info = await api("/api/export-info?" + new URLSearchParams({ repo: form.dataset.repo, hash: form.dataset.hash }));
      notes.innerHTML = `<span class="muted">${t("{count} \u4E2A\u6587\u4EF6", { count: info.files.toLocaleString(I18N.locale) })}${info.submodules.length ? t(" \xB7 {count} \u4E2A\u5B50\u6A21\u5757", { count: info.submodules.length }) : ""}</span>${info.warnings.map((w) => `<p>${esc(I18N.message(w))}</p>`).join("")}`;
      form.dataset.ready = "true";
      form.querySelector(".export-submit").disabled = state.exportBusy;
    } catch (err) {
      notes.innerHTML = `<p>${t("\u65E0\u6CD5\u68C0\u67E5\u5BFC\u51FA\u8303\u56F4\uFF1A")}${esc(err.message)}</p><button type="button" class="quiet-button retry-export-info">${t("\u91CD\u8BD5\u68C0\u67E5")}</button>`;
    } finally {
      delete form.dataset.checking;
    }
  }
  async function exportSelectedVersion(form) {
    if (!form.dataset.ready || state.exportBusy) return;
    const destination = form.querySelector("#exportDestination").value.trim();
    if (!destination) {
      toast(t("\u8BF7\u586B\u5199\u76EE\u6807\u6587\u4EF6\u5939"), true);
      return;
    }
    const includeGit = form.querySelector("#exportIncludeGit").checked;
    const payload = {
      repo: form.dataset.repo,
      hash: form.dataset.hash,
      destination,
      include_git: includeGit,
      branch: includeGit ? form.querySelector("#exportBranch").value.trim() : ""
    };
    const resultBox = form.querySelector(".export-result");
    state.exportBusy = true;
    updateAccessUI();
    document.querySelectorAll(".export-submit").forEach((button) => {
      button.disabled = true;
      button.textContent = t("\u6B63\u5728\u5BFC\u51FA\uFF0C\u8BF7\u7A0D\u5019\u2026");
    });
    resultBox.innerHTML = "";
    try {
      const result = await api("/api/export", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      state.lastExport = { ...result, repo: payload.repo };
      resultBox.innerHTML = exportResultMarkup(result);
      const currentForm = $("exportForm");
      if (currentForm && currentForm !== form && currentForm.dataset.hash === result.hash && currentForm.dataset.repo === payload.repo) {
        currentForm.querySelector(".export-result").innerHTML = exportResultMarkup(result);
      }
      toast(t("\u5BFC\u51FA\u5B8C\u6210\uFF1A") + result.path);
    } catch (err) {
      resultBox.innerHTML = `<div class="error-box">${t("\u5BFC\u51FA\u5931\u8D25\uFF1A")}${esc(err.message)}</div>`;
      if (!form.isConnected) toast(t("\u5BFC\u51FA\u5931\u8D25\uFF1A") + err.message, true);
    } finally {
      state.exportBusy = false;
      updateAccessUI();
      document.querySelectorAll(".export-submit").forEach((button) => {
        button.disabled = !button.closest("form").dataset.ready;
        button.textContent = t("\u5BFC\u51FA\u5230\u76EE\u6807\u6587\u4EF6\u5939");
      });
    }
  }
  async function loadChanges(path = "", patchOnly = false) {
    const row = state.selected;
    if (row < 0) return;
    const c = state.data.commits[row], request = ++state.request;
    state.file = path;
    const target = patchOnly ? $("patchContent") : $("changes");
    if (!target) return;
    target.innerHTML = `<div class="loading">${t("\u6B63\u5728\u8BFB\u53D6\u5DEE\u5F02\u2026")}</div>`;
    if (!patchOnly) $("changeSummary").innerHTML = "";
    const params = new URLSearchParams({ repo: state.data.repo, hash: c.hash, parent: state.parent, path });
    try {
      const data = await api(`/api/commit?${params}`);
      if (request !== state.request || c.hash !== state.data.commits[state.selected]?.hash) return;
      if (!patchOnly) {
        const added = data.files.reduce((n, f) => n + (f.additions || 0), 0);
        const deleted = data.files.reduce((n, f) => n + (f.deletions || 0), 0);
        $("changeSummary").innerHTML = `<span class="added">+${added}</span><span class="deleted">\u2212${deleted}</span>`;
        target.innerHTML = data.files.length ? `<div class="file-list">${data.files.map((f) => `<button class="file-button" data-file="${esc(f.path)}"><span class="file-status ${f.status}">${esc(f.status)}</span><span class="file-path">${esc(f.path)}</span><span class="file-nums">${f.additions == null ? t("\u4E8C\u8FDB\u5236") : `<span class="added">+${f.additions}</span> <span class="deleted">\u2212${f.deletions}</span>`}</span></button>`).join("")}</div><div class="section-heading"><span id="patchTitle">${t("\u5168\u90E8\u5DEE\u5F02 \xB7 {count} \u4E2A\u6587\u4EF6", { count: data.files.length })}</span><button id="allDiff" class="quiet-button">${t("\u67E5\u770B\u5168\u90E8")}</button></div><div id="patchContent"></div>` : `<p class="muted">${t("\u6B64\u63D0\u4EA4\u76F8\u5BF9\u6B64\u57FA\u51C6\u6CA1\u6709\u6587\u4EF6\u53D8\u66F4\u3002")}</p>`;
      }
      const patchTarget = $("patchContent");
      if (patchTarget) {
        patchTarget.innerHTML = `${data.truncated ? `<p class="muted">${t("\u5DEE\u5F02\u8F83\u5927\uFF0C\u4EC5\u663E\u793A\u524D 200,000 \u4E2A\u5B57\u7B26\u3002\u53EF\u70B9\u51FB\u5355\u4E2A\u6587\u4EF6\u67E5\u770B\u3002")}</p>` : ""}<div class="patch" tabindex="0" aria-label="${t("\u4EE3\u7801\u5DEE\u5F02")}">${data.patch ? data.patch.split("\n").map((line) => {
          const cls = line.startsWith("@@") ? "diff-hunk" : /^(diff |index |--- |\+\+\+ )/.test(line) ? "diff-file" : line.startsWith("+") ? "diff-add" : line.startsWith("-") ? "diff-del" : "";
          return `<div class="diff-line ${cls}">${esc(line) || " "}</div>`;
        }).join("") : `<div class="diff-line">${t("\u6CA1\u6709\u6587\u672C\u5DEE\u5F02")}</div>`}</div>`;
        $("patchTitle").textContent = path || t("\u5168\u90E8\u5DEE\u5F02 \xB7 {count} \u4E2A\u6587\u4EF6", { count: data.files.length });
        document.querySelectorAll(".file-button").forEach((b) => b.classList.toggle("active", b.dataset.file === path));
      }
    } catch (err) {
      if (request !== state.request) return;
      target.innerHTML = `<div class="error-box">${t("\u65E0\u6CD5\u8BFB\u53D6\u5DEE\u5F02\uFF1A")}${esc(err.message)}<br><button id="retryChanges">${t("\u91CD\u65B0\u8BFB\u53D6")}</button></div>`;
    }
  }
  async function loadGraph(repo) {
    if (state.loading || state.tagBusy) {
      pendingRepository = repo;
      return;
    }
    state.loading = true;
    resetWriteAccess();
    state.generation++;
    state.sortRequest++;
    $("sortStatus").textContent = "";
    $("sortSelect").disabled = true;
    state.request++;
    closeDetail();
    el.loadBtn.disabled = true;
    el.loadBtn.textContent = t("\u8BFB\u53D6\u4E2D\u2026");
    try {
      const data = await api("/api/graph" + (repo ? "?repo=" + encodeURIComponent(repo) : ""));
      state.data = data;
      state.sourceCommits = [...data.commits];
      state.sourceLayout = computeLayout(data.commits, data.main_hash);
      state.metrics = null;
      state.metricsPromise = null;
      state.sort = "date-desc";
      state.layout = state.sourceLayout;
      renderTypeFilters();
      el.repoInput.value = data.repo;
      el.searchInput.value = "";
      state.matches = [];
      state.matchIndex = -1;
      $("searchCount").textContent = "";
      applySort("date-desc");
      $("repoName").textContent = data.repo.replace(/[\\/]$/, "").split(/[\\/]/).pop() || t("\u63D0\u4EA4\u5386\u53F2");
      $("repoMeta").textContent = `${data.head || t("\u672A\u547D\u540D\u5206\u652F")} \xB7 ${data.stats.first_date?.slice(0, 10) || "\u2014"} \u2192 ${data.stats.last_date?.slice(0, 10) || "\u2014"}`;
      renderRepoStats();
      $("commitCount").textContent = data.stats.commits;
      $("mainLabel").textContent = `\u2442 ${data.main_branch || "HEAD"} / ${t("\u4E3B\u7EBF")}`;
      el.scroller.scrollTop = 0;
      el.scroller.scrollLeft = 0;
      $("emptyState").hidden = !!data.commits.length;
      if (!data.commits.length) showEmpty(t("\u8FD9\u91CC\u8FD8\u6CA1\u6709\u63D0\u4EA4"), t("\u4E3A\u4ED3\u5E93\u521B\u5EFA\u7B2C\u4E00\u6B21\u63D0\u4EA4\u540E\uFF0C\u91CD\u65B0\u6253\u5F00\u5373\u53EF\u67E5\u770B\u3002"));
      render();
      if (data.repo) history.replaceState(null, "", "?repo=" + encodeURIComponent(data.repo));
    } catch (err) {
      toast(t("\u52A0\u8F7D\u5931\u8D25\uFF1A") + err.message, true);
      if (!state.data) showEmpty(t("\u4ED3\u5E93\u5C1A\u672A\u6253\u5F00"), err.message);
    } finally {
      state.loading = false;
      updateAccessUI();
      el.loadBtn.disabled = false;
      $("sortSelect").disabled = false;
      el.loadBtn.innerHTML = `${t("\u6253\u5F00\u4ED3\u5E93")} <span>\u2197</span>`;
    }
  }
  function showEmpty(title, message) {
    $("emptyState").hidden = false;
    $("emptyState").querySelector("h2").textContent = title;
    $("emptyState").querySelector("p").textContent = message;
  }
  function search(navigate = true) {
    const q = el.searchInput.value.trim().toLocaleLowerCase();
    state.matches = [];
    if (q && state.data) state.data.commits.forEach((c, i) => {
      if ([c.hash, c.author, c.email, c.subject, c.body, ...(c.refs || []).map((r) => r.name)].join("\n").toLocaleLowerCase().includes(q)) state.matches.push(i);
    });
    state.matchIndex = state.matches.length ? 0 : -1;
    updateSearchCount();
    if (navigate && state.matches.length) jump(state.matches[0]);
    scheduleRender();
  }
  function updateSearchCount() {
    $("searchCount").textContent = !el.searchInput.value.trim() ? "" : state.matches.length ? `${state.matchIndex + 1}/${state.matches.length}` : t("\u65E0\u7ED3\u679C");
  }
  function setLanguage(language) {
    if (state.tagBusy || state.exportBusy || state.accessBusy) {
      pendingLocale = language;
      return;
    }
    const scrollerTop = el.scroller.scrollTop, scrollerLeft = el.scroller.scrollLeft;
    const detailTop = el.detailContent.scrollTop;
    const restore = state.selected < 0 ? null : {
      parent: state.parent,
      file: state.file,
      destination: $("exportDestination")?.value || "",
      includeGit: !!$("exportIncludeGit")?.checked,
      branch: $("exportBranch")?.value || "",
      tagName: $("tagName")?.value || "",
      exportOpen: !!$("exportPanel")?.open
    };
    I18N.setLocale(language);
    I18N.apply();
    $("languageSelect").value = I18N.locale;
    renderTypeFilters();
    renderRepoStats();
    updateAccessUI();
    updateSearchCount();
    if ($("sortStatus").textContent) $("sortStatus").textContent = t("\u7EDF\u8BA1\u53D8\u66F4\u91CF\u2026");
    el.loadBtn.innerHTML = state.loading ? t("\u8BFB\u53D6\u4E2D\u2026") : `${t("\u6253\u5F00\u4ED3\u5E93")} <span>\u2197</span>`;
    if (state.data) {
      $("mainLabel").textContent = state.sort.startsWith("date-") ? `\u2442 ${state.data.main_branch || "HEAD"} / ${t("\u4E3B\u7EBF")}` : `${t("\u63D0\u4EA4\u5217\u8868")} / ${state.sort.startsWith("edits-") ? t("\u7F16\u8F91\u91CF") : t("\u6587\u4EF6\u6570")}`;
      if (!state.data.commits.length) showEmpty(t("\u8FD9\u91CC\u8FD8\u6CA1\u6709\u63D0\u4EA4"), t("\u4E3A\u4ED3\u5E93\u521B\u5EFA\u7B2C\u4E00\u6B21\u63D0\u4EA4\u540E\uFF0C\u91CD\u65B0\u6253\u5F00\u5373\u53EF\u67E5\u770B\u3002"));
    } else {
      $("repoName").textContent = t("\u63D0\u4EA4\u5386\u53F2");
      $("repoMeta").textContent = t("\u6BCF\u4E00\u6761\u5206\u652F\uFF0C\u90FD\u6709\u8FF9\u53EF\u5FAA\u3002");
      $("mainLabel").textContent = t("\u4E3B\u5206\u652F");
    }
    if (restore) {
      selectCommit(state.selected, false, restore);
      el.detailContent.scrollTop = detailTop;
    }
    el.scroller.scrollTop = scrollerTop;
    el.scroller.scrollLeft = scrollerLeft;
    render();
  }
  function nextMatch() {
    if (!state.matches.length) return;
    state.matchIndex = (state.matchIndex + 1) % state.matches.length;
    updateSearchCount();
    selectCommit(state.matches[state.matchIndex], true);
  }
  el.graph.addEventListener("click", (e) => {
    if (state.loading) return;
    const row = e.target.closest("[data-row]");
    if (row) selectCommit(Number(row.dataset.row));
  });
  el.scroller.addEventListener("scroll", scheduleRender, { passive: true });
  new ResizeObserver(scheduleRender).observe(el.scroller);
  $("closeDetail").addEventListener("click", closeDetail);
  $("repoForm").addEventListener("submit", (e) => {
    e.preventDefault();
    loadGraph(el.repoInput.value.trim());
  });
  el.detailContent.addEventListener("click", async (e) => {
    const openButton = e.target.closest(".open-export");
    if (openButton) {
      openButton.disabled = true;
      try {
        await api("/api/open-folder", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ path: openButton.dataset.path }) });
      } catch (err) {
        toast(t("\u65E0\u6CD5\u6253\u5F00\u6587\u4EF6\u5939\uFF1A") + err.message, true);
      } finally {
        openButton.disabled = false;
      }
    }
    if (e.target.closest(".retry-export-info")) prepareExport(e.target.closest(".export-panel"));
    const relation = e.target.closest("button.relation[data-hash]");
    if (relation) selectCommit(state.layout.rowOf.get(relation.dataset.hash), true);
    const file = e.target.closest("[data-file]");
    if (file) loadChanges(file.dataset.file, true);
    if (e.target.closest("#allDiff")) loadChanges("", true);
    if (e.target.closest("#retryChanges")) loadChanges();
    if (e.target.closest("#copyHash")) {
      try {
        await navigator.clipboard.writeText(state.data.commits[state.selected].hash);
        toast(t("\u5DF2\u590D\u5236\u5B8C\u6574\u63D0\u4EA4\u54C8\u5E0C"));
      } catch {
        toast(t("\u590D\u5236\u5931\u8D25\uFF0C\u8BF7\u4ECE\u6309\u94AE\u63D0\u793A\u4E2D\u83B7\u53D6\u5B8C\u6574\u54C8\u5E0C"), true);
      }
    }
  });
  el.detailContent.addEventListener("change", (e) => {
    if (e.target.id === "exportIncludeGit") {
      $("exportBranchField").hidden = !e.target.checked;
      $("exportModeHint").textContent = e.target.checked ? t("\u590D\u5236\u72EC\u7ACB\u7684 Git \u5386\u53F2\u5E76\u68C0\u51FA\u6B64\u63D0\u4EA4\uFF0C\u4E0D\u4F9D\u8D56\u6E90\u4ED3\u5E93\u7684\u5BF9\u8C61\u6587\u4EF6\u3002") : t("\u4EC5\u5BFC\u51FA\u63D0\u4EA4\u4E2D\u7684\u6587\u4EF6\uFF0C\u4E0D\u9644\u5E26 Git \u5386\u53F2\u3002");
    }
    if (e.target.id === "parentSelect") {
      state.parent = Number(e.target.value);
      loadChanges();
    }
  });
  el.detailContent.addEventListener("toggle", (e) => {
    if (e.target.id === "exportPanel" && e.target.open) prepareExport(e.target);
  }, true);
  el.detailContent.addEventListener("submit", (e) => {
    if (e.target.id === "exportForm") {
      e.preventDefault();
      exportSelectedVersion(e.target);
    }
    if (e.target.id === "tagForm") {
      e.preventDefault();
      createSelectedTag(e.target);
    }
  });
  $("sourceAccessBtn").addEventListener("click", () => {
    if (!state.data || state.loading || state.tagBusy || state.accessBusy) return;
    if (state.writeToken) {
      resetWriteAccess();
      toast(t("\u5DF2\u5207\u56DE\u6E90\u4ED3\u5E93\u53EA\u8BFB"));
      return;
    }
    $("writeAccessRepo").textContent = state.data.repo;
    $("writeAccessDialog").dataset.repo = state.data.repo;
    $("writeAccessError").textContent = "";
    $("writeAccessDialog").showModal();
  });
  $("cancelWriteBtn").addEventListener("click", () => $("writeAccessDialog").close());
  $("enableWriteBtn").addEventListener("click", enableWriteAccess);
  $("undoTagsBtn").addEventListener("click", undoSoftwareTags);
  $("languageSelect").addEventListener("change", (e) => setLanguage(e.target.value));
  el.searchInput.addEventListener("input", search);
  el.searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nextMatch();
    }
  });
  $("searchNext").addEventListener("click", nextMatch);
  $("sortSelect").addEventListener("change", (e) => changeSort(e.target.value));
  $("typeFilters").addEventListener("click", (e) => {
    const button = e.target.closest("[data-type]");
    if (!button) return;
    const type = button.dataset.type;
    if (type === "all") state.filters.clear();
    else if (state.filters.has(type)) state.filters.delete(type);
    else state.filters.add(type);
    renderTypeFilters();
    scheduleRender();
  });
  $("headBtn").addEventListener("click", () => {
    if (!state.data) return;
    const row = state.layout.rowOf.get(state.data.head_hash);
    if (row == null) toast(t("\u5F53\u524D HEAD \u6CA1\u6709\u53EF\u663E\u793A\u7684\u63D0\u4EA4"));
    else {
      jump(row);
      if (state.selected >= 0) selectCommit(row);
    }
  });
  document.addEventListener("keydown", (e) => {
    if ($("writeAccessDialog").open) return;
    if (e.key === "Escape" && state.selected >= 0) {
      e.preventDefault();
      closeDetail();
      return;
    }
    if (/^(INPUT|TEXTAREA|SELECT|BUTTON)$/.test(e.target.tagName) || e.target.closest("#detail")) return;
    if (e.key === "/") {
      e.preventDefault();
      el.searchInput.focus();
    }
    if ((e.key === "ArrowDown" || e.key === "ArrowUp") && state.data?.commits.length) {
      e.preventDefault();
      const row = state.selected < 0 ? 0 : Math.max(0, Math.min(state.data.commits.length - 1, state.selected + (e.key === "ArrowDown" ? 1 : -1)));
      selectCommit(row, true);
    }
  });
  setLanguage(I18N.locale);
  if (bridge.repo) loadGraph(bridge.repo);
  else showEmpty(t("\u6253\u5F00\u4E00\u6BB5\u63D0\u4EA4\u5386\u53F2"), t("\u5728\u4E0A\u65B9\u8F93\u5165\u672C\u5730 Git \u4ED3\u5E93\u7684\u8DEF\u5F84\u3002"));
  I18N.setLocale(bridge.locale.startsWith("zh") ? "zh-CN" : "en");
  setLanguage(I18N.locale);
  root.host.dataset.theme = bridge.theme;
  return {
    setLocale: (locale) => {
      if (!disposed) setLanguage(locale.startsWith("zh") ? "zh-CN" : "en");
    },
    setTheme: (theme) => {
      root.host.dataset.theme = theme;
    },
    setRepository: (repo) => {
      if (!disposed && repo !== currentRepo) {
        currentRepo = repo;
        if (repo) loadGraph(repo);
        else {
          closeDetail();
          resetWriteAccess();
        }
      }
    },
    resetAccess: () => {
      if (!disposed) resetWriteAccess();
    },
    dispose: async () => {
      if (disposed) return;
      disposed = true;
      const token = state.writeToken, repo = state.data?.repo;
      state.writeToken = "";
      controller.abort();
      for (const timer of timers) globalThis.clearTimeout(timer);
      for (const frame of frames) globalThis.cancelAnimationFrame(frame);
      for (const observer of observers) observer.disconnect();
      if (root.getElementById("git-tree-root") === container) root.replaceChildren();
      if (token && repo) {
        const reply = await bridge.request("write-access", { repo, token, enabled: false });
        if (!reply.ok) bridge.onError(reply.error);
      }
    }
  };
}

// src/client/index.tsx
var name = "git-tree-viz-client";
var inject = ["slots", "connection", "locale", "theme"];
var NS = "gitTreeViz";
var en = { panel: "Git history", workspace: "Workspace", automatic: "Following this conversation\u2019s workspace", missing: "No workspace assigned to this conversation" };
var zh = { panel: "Git \u5386\u53F2", workspace: "\u5DE5\u4F5C\u533A", automatic: "\u81EA\u52A8\u8DDF\u968F\u5F53\u524D\u4F1A\u8BDD\u5DE5\u4F5C\u533A", missing: "\u5F53\u524D\u4F1A\u8BDD\u5C1A\u672A\u5173\u8054\u5DE5\u4F5C\u533A" };
function GitTreeIcon({ size = 20 }) {
  return /* @__PURE__ */ import_react.default.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7", "aria-hidden": "true" }, /* @__PURE__ */ import_react.default.createElement("path", { d: "M6 5v14M18 5v4c0 5-12 3-12 9" }), /* @__PURE__ */ import_react.default.createElement("circle", { cx: "6", cy: "4", r: "2" }), /* @__PURE__ */ import_react.default.createElement("circle", { cx: "18", cy: "4", r: "2" }), /* @__PURE__ */ import_react.default.createElement("circle", { cx: "6", cy: "20", r: "2" }));
}
function GitTreePanel(props) {
  const locale = (0, import_react.useSyncExternalStore)(props.locale.subscribe.bind(props.locale), props.locale.getSnapshot.bind(props.locale));
  const theme = (0, import_react.useSyncExternalStore)(props.theme.subscribe.bind(props.theme), props.theme.getSnapshot.bind(props.theme));
  const generation = (0, import_react.useSyncExternalStore)(props.generation.subscribe.bind(props.generation), props.generation.getSnapshot.bind(props.generation));
  const workspaces = props.useWorkspaces((s) => s.items);
  const currentWorkspace = workspaces.find((row) => row.sessionIds.includes(props.sessionId));
  const repo = currentWorkspace?.path ?? "";
  const container = (0, import_react.useRef)(null), view = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => {
    if (!container.current) return;
    const root = container.current.shadowRoot ?? container.current.attachShadow({ mode: "open" });
    const mounted = mountGitTree(root, { repo, locale: locale.active, theme: theme.active.colorScheme, request: props.request, onError: (error) => console.error("[git-tree-viz]", error) });
    view.current = mounted;
    return () => {
      view.current = null;
      void mounted.dispose().catch((error) => console.error("[git-tree-viz] dispose failed", error));
    };
  }, [props.request, props.sessionId, repo]);
  (0, import_react.useEffect)(() => {
    view.current?.setLocale(locale.active);
  }, [locale.active]);
  (0, import_react.useEffect)(() => {
    view.current?.setTheme(theme.active.colorScheme);
  }, [theme.active.colorScheme]);
  (0, import_react.useEffect)(() => {
    view.current?.setRepository(repo);
  }, [repo]);
  (0, import_react.useEffect)(() => {
    view.current?.resetAccess();
  }, [generation]);
  return /* @__PURE__ */ import_react.default.createElement("div", { style: { height: "100%", minHeight: 0, overflow: "auto", display: "flex", flexDirection: "column" } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { padding: "8px 14px", display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", borderBottom: "1px solid var(--dsw-alias-border-l1,#30373c)", fontSize: 12 } }, /* @__PURE__ */ import_react.default.createElement("span", null, props.t("workspace"), " \xB7 ", currentWorkspace?.title ?? props.t("missing")), /* @__PURE__ */ import_react.default.createElement("span", { style: { opacity: 0.6, fontSize: 11 } }, props.t("automatic"))), /* @__PURE__ */ import_react.default.createElement("div", { ref: container, style: { flex: 1, minHeight: 640, minWidth: 360, width: "100%" }, tabIndex: -1 }));
}
function apply(ctx) {
  ctx.effect(() => ctx.locale.register(NS, { en, zh }), "git-tree-viz: native locale dictionaries");
  const request = (endpoint, payload, signal) => ctx.connection.rpc.call("/git-tree-viz", endpoint, payload, signal);
  const t = ctx.locale.bind(NS);
  const theme = { getSnapshot: () => ctx.theme.getTheme(), subscribe: (callback) => ctx.on("theme/change", callback) };
  ctx.slots.inject("conversation.view", () => ctx.slots.register({ name: "conversation.view", id: "git-tree-viz", locale: NS, order: 30, label: () => t("panel"), inject: () => ({ request, locale: ctx.locale, theme, generation: ctx.connection.generation }) }, GitTreePanel));
}

return module.exports;}});
