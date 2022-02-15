export enum LogLevelEnum {
    DEBUG = 'debug',
    INFO = 'info',
    ERROR = 'error',
    WARN = 'warn',
}
export interface LogDto {
    timestamp: number;
    loglevel: LogLevelEnum;
    transactionId: string;
    details?: string;
    code?: number;
    err?: string;
}
