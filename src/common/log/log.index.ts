import { Logger } from "@nestjs/common";

export class AppLogger {
    static log(message: string, ...rest: any) {
        Logger.log(`Info : ${message} ${rest || ''}\n`);
    }

    static error(error: string, ...rest: any) {
        Logger.error(`Error: ${error} ${rest || ''}\n`);
    }

    static warn(warning: string, ...rest: any) {
        Logger.warn(`Warn : ${warning} ${rest || ''}\n`);
    }

    static debug(debug: string, ...rest: any) {
        Logger.debug(`Debug: ${debug} ${rest || ''}\n`);
    }
}