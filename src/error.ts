import { Error, ErrorHandler } from "./types";

/**
 * 1. Define pipeline array
 * 2. add register function
 * 3. think about next params and pipeline
 */

/**
 * Handler functions
 */
const handlers: { identifier: string; handler: ErrorHandler }[] = [];

/**
 *
 * @param identifier handler identifier
 * @param handler handler function
 */
export function registerParser(identifier: string, handler: ErrorHandler) {
    handlers.push({ identifier, handler });
}

/**
 * Handle Http Errors
 * @param err http error
 */
export function resolveErrors(err: Error) {
    for (const handler of handlers) {
        const res = handler.handler(err);
        if (res !== undefined) err.identifier = handler.identifier;
        if (res === false) break;
    }
}
