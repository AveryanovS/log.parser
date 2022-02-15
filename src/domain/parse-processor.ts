import {LogDto} from "./dto/log.dto";
import {LogOutputService} from "./ports/out/log-output.service";
import {inject, injectable} from "inversify";
import {TYPES} from '../types'

export type LinesHandlerFunction = (line: string) => void;
export interface LinesInput {
    handleLine(handler: LinesHandlerFunction):void;
    handleEnd(handler: () => void):void;
    handleError(handler: (error:Error) => void):void;
}


export interface FilterUsecase {
    exec(log: LogDto): boolean;
}

export interface ParseLineUsecase {
    exec(line: string): LogDto;
}

@injectable()
export class ParseProcessor<OutputArg> {
    constructor(
        @inject(TYPES.FilterUsecase)
        private readonly filterUsecase: FilterUsecase,
        @inject(TYPES.ParseLineUsecase)
        private readonly parseLineUsecase: ParseLineUsecase,
        @inject(TYPES.LogOutputService)
        private readonly logOutputService: LogOutputService<OutputArg>,
    ) {
    }
    public async parse(input: LinesInput, outputArg: OutputArg):Promise<number> {

        return new Promise<number>((resolve, reject) => {
            let firstLogPromise:Promise<any>;
            const writePromises:Promise<any>[] = [];

            input.handleLine((line: string) => {
                const parsed:LogDto = this.parseLineUsecase.exec(line);
                if(this.filterUsecase.exec(parsed)) {
                    if(!firstLogPromise)
                        firstLogPromise = this.logOutputService.writeFirstLog(parsed, outputArg);
                    else
                        writePromises.push(this.logOutputService.writeLog(parsed, outputArg));
                }
            })

            input.handleEnd( async () => {
                try {
                    await firstLogPromise;
                    await Promise.all(writePromises);
                    await this.logOutputService.finishWriting(outputArg);
                    resolve(0);
                } catch (e) {reject(e)}
            })
            input.handleError((error) => reject(error));
        });

    }
}
