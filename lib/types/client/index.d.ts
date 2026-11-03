/** Session-scoped conversation tab. Only React is a shared runtime external. */
import React from 'react';
import type { ClientPluginContext, PanelProps } from './contracts.ts';
export declare const name = "git-tree-viz-client";
export declare const inject: string[];
/** Geometry-only sidebar icon; text belongs to Harness locale dictionaries. */
export declare function GitTreeIcon({ size }: {
    size?: number;
}): React.JSX.Element;
/** Each conversation tab follows its own workspace and owns one disposable graph view. */
export declare function GitTreePanel(props: PanelProps): React.JSX.Element;
/** Contribute alongside Chat/Trajectory/Context, with Harness supplying the scoped session id. */
export declare function apply(ctx: ClientPluginContext): void;
