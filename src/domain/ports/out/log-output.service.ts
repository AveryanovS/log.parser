import {LogDto} from "../../dto/log.dto";

export interface LogOutputService<OutputArg> {
    writeFirstLog(log: LogDto, arg: OutputArg):Promise<void>;
    writeLog(log: LogDto, arg: OutputArg):Promise<void>;
    finishWriting(arg: OutputArg):Promise<void>;
}
