import { Error, ErrorHandler } from "../types";

/**
 * Handle forbidden error [403]
 * This handler don'tstop pipeline
 *
 * @param message string
 */
export function ForbiddenParser(message: string): ErrorHandler {
    return (err: Error): true | false | undefined => {
        if (err.type === "response" && err.status === 403) {
            err.message = message;
            return true;
        }
        return undefined;
    };
}
