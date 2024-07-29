import { Logger, createLogger, format, transports } from "winston";
import { LOGGER_CONFIG } from "../config";

export class LoggerService {

    private static instance: LoggerService;
    private logger: Logger;

    constructor() {
        this.logger = createLogger({
            level: LOGGER_CONFIG.log.level,
            format: format.combine(
                format.colorize(),
                format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                format.printf(({ timestamp, level, message, ...metadata }) => {
                    let msg = `${timestamp} [${level}] : ${message} `;
                    if (metadata) {
                        msg += JSON.stringify(metadata);
                    }
                    return msg;
                })
            ),
            transports: [
                new transports.Console(),
                new transports.File({ filename: LOGGER_CONFIG.log.file.filename, level: LOGGER_CONFIG.log.file.level })
            ]
        })
    }

    public static getInstance(): LoggerService {
        if (!this.instance) {
            this.instance = new LoggerService();
        }
        return this.instance
    }

    public info(message: string, meta?: any): void {
        this.logger.info(message, meta);
    }

    public error(message: string, meta?: any): void {
        this.logger.error(message, meta);
    }

    public warn(message: string, meta?: any): void {
        this.logger.warn(message, meta);
    }

    public debug(message: string, meta?: any): void {
        this.logger.debug(message, meta);
    }
}
