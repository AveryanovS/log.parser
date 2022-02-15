import {LinesHandlerFunction, LinesInput, ParseProcessor} from "../domain/parse-processor";
import {createReadStream} from "fs";
import {createInterface} from "readline"
import yargs from 'yargs/yargs';
import {inject, injectable} from "inversify";

export interface FilePathOutputArg {
    filePath: string;
}
@injectable()
export class CliParser {
    constructor(
        @inject<ParseProcessor<FilePathOutputArg>>(ParseProcessor)
        private parser: ParseProcessor<FilePathOutputArg>
    ) {
    }

    public run():Promise<any> {

        const argv = yargs(process.argv.slice(2)).options({
            input: { type: 'string', demandOption: true },
            output: { type: 'string', demandOption: true },
        }).parseSync();

        const stream = createReadStream(argv.input);
        const readline = createInterface(stream);

        const input:LinesInput = {
            handleLine: (handler: LinesHandlerFunction) => {
                readline.on('line', function (line) {
                    handler(line.toString());
                })
            },
            handleEnd: (handler: () => void) => {
                stream.on('end', function () {
                    handler();
                })
            },
            handleError: (handler: (error: Error) => void) => {
                stream.on('error', function (error) {
                    handler(error);
                })
            },
        };
        return this.parser.parse(input, {filePath:argv.output});
    }
}
