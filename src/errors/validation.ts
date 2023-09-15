import { Error, ErrorHandler } from "../types";

/**
 * Handle validation error [422]
 * This handler don'tstop pipeline
 *
 * @param message string
 */
export function ValidationParser(message: string): ErrorHandler {
    return (err: Error): true | false | undefined => {
        if (err.type === "response" && err.status === 422) {
            err.message = message;
            return true;
        }
        return undefined;
    };
}
