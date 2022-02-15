import {LogOutputService} from "../domain/ports/out/log-output.service";
import {FilePathOutputArg} from "../app/cli.parser";
import {appendFile, writeFile} from "fs/promises";
import {LogDto} from "../domain/dto/log.dto";
import {injectable} from "inversify";

@injectable()
export class LogServiceJsonImpl implements LogOutputService<FilePathOutputArg> {
    writeFirstLog(log: LogDto, arg: FilePathOutputArg): Promise<void> {
        return writeFile(arg.filePath, '['+JSON.stringify(log))
    }

    writeLog(log: LogDto, arg: FilePathOutputArg): Promise<void> {
        return appendFile(arg.filePath,','+JSON.stringify(log));
    }

    finishWriting(arg: FilePathOutputArg): Promise<void> {
        return appendFile(arg.filePath, ']')
    }
}
