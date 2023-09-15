import { Error, ErrorHandler } from "../types";

/**
 * Handle CSRF error [419]
 * This handler don'tstop pipeline
 *
 * @param message string
 */
export function CSRFParser(message: string): ErrorHandler {
    return (err: Error): true | false | undefined => {
        if (err.type === "response" && err.status === 419) {
            err.message = message;
            return true;
        }
        return undefined;
    };
}
