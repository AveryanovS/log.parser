import {ParseLineUsecase} from "../parse-processor";
import {LogDto, LogLevelEnum} from "../dto/log.dto";
import {injectable} from "inversify";

@injectable()
export class ParseLineUsecaseImpl implements ParseLineUsecase {
    exec(line: string): LogDto {
        const match = line.match(/(.*?)\s-\s(.*?)\s-\s(.*?){\"(.*?)}/g);
        if(!match)
            throw new Error('Incorrect line');

        const [timestamp, level, ...data] = line.split(' - ');
        const parsedData = JSON.parse(data.join(' - '));
        return {
            timestamp: new Date(timestamp).valueOf(),
            loglevel: level as LogLevelEnum,
            transactionId: parsedData.transactionId,
            details: parsedData.details,
            code: parsedData.code,
            err: parsedData.err,
        }
    }

}
