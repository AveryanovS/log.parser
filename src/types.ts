import {FilterUsecase, ParseLineUsecase} from "./domain/parse-processor";
import {LogOutputService} from "./domain/ports/out/log-output.service";

const TYPES = {
    FilterUsecase: Symbol.for('FilterUsecase'),
    ParseLineUsecase: Symbol.for('ParseLineUsecase'),
    LogOutputService: Symbol.for('LogOutputService')
}
export {TYPES}
