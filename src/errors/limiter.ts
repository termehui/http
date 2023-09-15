import { Error, ErrorHandler } from "../types";

/**
 * Handle rate limiter error [429]
 * This handler don'tstop pipeline
 *
 * @param message string
 */
export function RateLimiterParser(message: string): ErrorHandler {
    return (err: Error): true | false | undefined => {
        if (err.type === "response" && err.status === 429) {
            err.message = message;
            return true;
        }
        return undefined;
    };
}
