import {FilterUsecase} from "../parse-processor";
import {LogDto, LogLevelEnum} from "../dto/log.dto";
import {injectable} from "inversify";

@injectable()
export class FilterErrorsUsecaseImpl implements FilterUsecase {
    exec(log: LogDto): boolean {
        if(log.loglevel === LogLevelEnum.ERROR)
            return true;
        return false;
    }

}
