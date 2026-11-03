/** Cordis Host contribution using the authenticated Connection channel extension point. */
import type { Context } from '@deepseek-ai/cordis';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { GitEngine } from './engine.ts';
import type { GitTreeConfig } from './types.ts';
/** Connection subset consumed by the out-of-tree plugin; structurally matches HostConnectionRpc. */
export interface OwnerPeer {
    readonly principal: {
        readonly kind: string;
    };
}
/** Harness-neutral result carried by Connection after its trust/authentication checks. */
export type RpcResult = {
    ok: true;
    value: unknown;
} | {
    ok: false;
    error: {
        code: string;
        message: string;
        details: object;
    };
};
/** Host services required by this third-party plugin. */
export interface HostPluginContext extends Context {
    connection: {
        admit(request: {
            headers: Headers;
        }): {
            peer: OwnerPeer;
        } | {
            rejection: 401 | 403;
        };
    };
    webServer: {
        register(route: {
            kind: 'prefix';
            path: string;
            handler: (request: IncomingMessage, response: ServerResponse) => Promise<void>;
        }): () => void;
    };
}
export declare const name = "git-tree-viz";
export declare const inject: string[];
export declare const CHANNEL = "/git-tree-viz";
/** Validate wire requests and route only explicit owner-Peer UI operations. */
export declare function createDispatcher(engine: GitEngine): (endpoint: string, payload: unknown, signal: AbortSignal, peer: OwnerPeer) => Promise<RpcResult>;
/** Register one channel and await accepted writes during plugin removal. */
export declare function apply(ctx: HostPluginContext, input?: Partial<GitTreeConfig>): void;
