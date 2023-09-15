import { Error, ErrorHandler } from "../types";

/**
 * Handle not found error [404]
 * This handler don'tstop pipeline
 *
 * @param message string
 */
export function NotFoundParser(message: string): ErrorHandler {
    return (err: Error): true | false | undefined => {
        if (err.type === "response" && err.status === 404) {
            err.message = message;
            return true;
        }
        return undefined;
    };
}
