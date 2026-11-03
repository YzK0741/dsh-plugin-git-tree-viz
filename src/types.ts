/** JSON values carried by the authenticated plugin RPC channel. */
export type Json = null | boolean | number | string | Json[] | { [key:string]:Json }
/** Validated plugin deployment settings. */
export interface GitTreeConfig { gitTimeoutMs:number; maxOutputBytes:number; maxPatchCharacters:number }
/** One exported Git reference. */
export interface GitRef {name:string;kind:'branch'|'tag'|'remote';type?:string;date?:string}
/** Commit data shared with the graph UI. */
export interface Commit {hash:string;parents:string[];author:string;email:string;date:string;subject:string;body:string;refs:GitRef[]}
/** Per-commit text and file changes relative to the first parent. */
export interface Metrics {additions:number;deletions:number;edits:number;files:number}
/** Persistent app-owned tag marker and the current tag's relation to it. */
export interface OwnedTag {name:string;hash:string;status:'missing'|'unchanged'|'changed'}
/** Safe export preflight shared by both output modes. */
export interface ExportInfo {repo:string;hash:string;files:number;submodules:string[];lfs:boolean;symlinks:number;warnings:string[]}
