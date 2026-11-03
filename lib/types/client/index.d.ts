/** Native sidebar/main-panel contribution. Only React is a shared runtime external. */
import React from 'react';
import type { ClientPluginContext, PanelProps } from './contracts.ts';
export declare const name = "git-tree-viz-client";
export declare const inject: string[];
/** Geometry-only sidebar icon; text belongs to Harness locale dictionaries. */
export declare function GitTreeIcon({ size }: {
    size?: number;
}): React.JSX.Element;
/** Native panel owns workspace choice, service subscriptions and one disposable graph view. */
export declare function GitTreePanel(props: PanelProps): React.JSX.Element;
/** Register reversible native navigation and keep runtime services out of the panel's implementation. */
export declare function apply(ctx: ClientPluginContext): void;
