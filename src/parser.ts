import 'reflect-metadata';
import {Container} from "inversify";
import {FilterUsecase, ParseLineUsecase, ParseProcessor} from "./domain/parse-processor";
import {CliParser, FilePathOutputArg} from "./app/cli.parser";
import {TYPES} from "./types";
import {FilterErrorsUsecaseImpl} from "./domain/usecases/filter-errors.usecase";
import {ParseLineUsecaseImpl} from "./domain/usecases/parse-line.usecase";
import {LogOutputService} from "./domain/ports/out/log-output.service";
import {LogServiceJsonImpl} from "./infrastructure/log.service.json-impl";

const container = new Container();

container.bind<CliParser>(CliParser).toSelf().inSingletonScope();
container.bind<ParseProcessor<FilePathOutputArg>>(ParseProcessor).toSelf().inSingletonScope();
container.bind<FilterUsecase>(TYPES.FilterUsecase).to(FilterErrorsUsecaseImpl).inSingletonScope();
container.bind<ParseLineUsecase>(TYPES.ParseLineUsecase).to(ParseLineUsecaseImpl).inSingletonScope();
container.bind<LogOutputService<FilePathOutputArg>>(TYPES.LogOutputService).to(LogServiceJsonImpl).inSingletonScope();

const parser = container.get<CliParser>(CliParser);
parser.run()
    .then(result => console.log('Parsing ended up with result', result))
    .catch(error => console.error('Parsing error', error));

