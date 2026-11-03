/** Minimal structural faces of the documented Harness Client service seams. */
import type { Context } from '@deepseek-ai/cordis';
import type { ComponentType } from 'react';
declare module '@deepseek-ai/cordis' {
    interface Events {
        'theme/change'(snapshot: {
            active: {
                colorScheme: 'light' | 'dark';
            };
        }): void;
    }
}
/** Read-only lifecycle-owned snapshot source supplied by Harness. */
export interface Observable<T> {
    getSnapshot(): T;
    subscribe(callback: () => void): () => void;
}
/** Workspace fields used to find the current conversation's repository. */
export interface WorkspaceRow {
    workspaceId: string;
    path: string;
    title: string;
    sessionIds: readonly string[];
}
/** Platform-neutral native panel business face. */
export interface PanelFace {
    request: (endpoint: string, payload: unknown, signal?: AbortSignal) => Promise<{
        ok: true;
        value: unknown;
    } | {
        ok: false;
        error: {
            code: string;
            message: string;
            details: object;
        };
    }>;
    locale: Observable<{
        active: string;
    }>;
    theme: Observable<{
        active: {
            colorScheme: 'light' | 'dark';
        };
    }>;
    generation: Observable<unknown>;
}
/** Harness supplies the session id for the conversation.view scope and global workspace hook. */
export interface PanelProps extends PanelFace {
    sessionId: string;
    useWorkspaces: <T>(selector: (state: {
        items: readonly WorkspaceRow[];
    }) => T) => T;
    t: (key: string) => string;
}
/** Native view adapter keeps all standalone DOM state inside one ShadowRoot. */
export interface ViewBridge {
    repo: string;
    locale: string;
    theme: 'light' | 'dark';
    request: PanelFace['request'];
    onError: (error: unknown) => void;
}
/** Resources returned by one mounted graph panel. */
export interface ViewController {
    setLocale(language: string): void;
    setTheme(theme: 'light' | 'dark'): void;
    setRepository(repo: string): void;
    resetAccess(): void;
    dispose(): Promise<void>;
}
/** Client Cordis services consumed without importing Host packages into the browser bundle. */
export interface ClientPluginContext extends Context {
    connection: {
        rpc: {
            call: PanelFace['request'] extends (...args: infer A) => infer R ? (channel: string, ...args: A) => R : never;
        };
        generation: Observable<unknown>;
    };
    locale: PanelFace['locale'] & {
        register(namespace: string, dictionaries: Record<string, Record<string, string>>): () => void;
        bind(namespace: string): (key: string) => string;
    };
    theme: {
        getTheme(): ReturnType<PanelFace['theme']['getSnapshot']>;
    };
    slots: {
        inject(name: string, factory: () => unknown): () => void;
        register(options: {
            name: string;
            id?: string;
            key?: string;
            locale?: string;
            order?: number;
            label?: () => string;
            inject?: () => PanelFace;
        }, component: ComponentType<never>): () => void;
    };
}
