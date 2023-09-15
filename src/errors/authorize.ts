import { Error, ErrorHandler } from "../types";

/**
 * Handle authorization error [401]
 * This handler don'tstop pipeline
 *
 * @param message string
 */
export function AuthorizedParser(message: string): ErrorHandler {
    return (err: Error): true | false | undefined => {
        if (err.type === "response" && err.status === 401) {
            err.message = message;
            return true;
        }
        return undefined;
    };
}
