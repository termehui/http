import { Error, ErrorHandler } from "../types";

/**
 * Handle maintenance error [503]
 * This handler don'tstop pipeline
 *
 * @param message string
 */
export function MaintenanceParser(message: string): ErrorHandler {
    return (err: Error): true | false | undefined => {
        if (err.type === "response" && err.status === 503) {
            err.message = message;
            return true;
        }
        return undefined;
    };
}
