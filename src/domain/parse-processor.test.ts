import 'reflect-metadata';
import {
    anything, instance, mock, when,
} from 'ts-mockito';
import {FilterUsecase, LinesHandlerFunction, LinesInput, ParseLineUsecase, ParseProcessor} from './parse-processor';
import {LogOutputService} from "./ports/out/log-output.service";
import {LogDto, LogLevelEnum} from "./dto/log.dto";

class MockInput implements LinesInput {
    private linesHandler:any = null;
    private endHandler:any = null;
    private errorHandler:any = null;

    handleEnd(handler: () => void): void {
        this.endHandler = handler;
    }

    handleError(handler: (error: Error) => void): void {
        this.errorHandler = handler;
    }

    handleLine(handler: LinesHandlerFunction): void {
        this.linesHandler = handler;
    }

    mockLine(line: string):void {
        return this.linesHandler(line)
    }
    mockEnd():void {
        return this.endHandler()
    }

    mockError(error: Error):void {
        return this.errorHandler(error)
    }


}
const mockedDto:LogDto  = {
    timestamp: 1,
    loglevel: LogLevelEnum.INFO,
    transactionId: 'id',
    details: 'details',
    code: 404,
    err: 'error'
}
const mockedLine = '2021-08-09T02:12:51.253Z - info - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Service is started"}';

describe('Login usecase', () => {
    const filterUsecase = mock<FilterUsecase>();
    const parseLineUsecase = mock<ParseLineUsecase>();
    const logOutputService = mock<LogOutputService<string>>();

    when(filterUsecase.exec(anything())).thenReturn(true);
    when(parseLineUsecase.exec(anything())).thenReturn(mockedDto);

    const processor = new ParseProcessor<string>(
        instance(filterUsecase),
        instance(parseLineUsecase),
        instance(logOutputService),
    );

    const mockInput = new MockInput();

    describe('Happy path', () => {
        it('Just works', async () => {
            const promise = processor.parse(mockInput, 'mock');
            mockInput.mockLine(mockedLine);
            mockInput.mockLine(mockedLine);
            mockInput.mockLine(mockedLine);
            mockInput.mockEnd();
            const result = await promise;
            expect(result).toEqual(0);
        });
    });

});
