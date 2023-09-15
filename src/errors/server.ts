import { Error, ErrorHandler } from "../types";

/**
 * Handle server error [500]
 * This handler don'tstop pipeline
 *
 * @param message string
 */
export function ServerParser(message: string): ErrorHandler {
    return (err: Error): true | false | undefined => {
        if (err.type === "response" && err.status === 500) {
            err.message = message;
            return true;
        }
        return undefined;
    };
}
