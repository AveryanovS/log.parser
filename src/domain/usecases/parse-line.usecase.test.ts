import 'reflect-metadata';

import {ParseLineUsecaseImpl} from "./parse-line.usecase";
import {LogLevelEnum} from "../dto/log.dto";

describe('Parse line usecase', () => {

    const usecase = new ParseLineUsecaseImpl();

    describe('Happy path', () => {
        it('Returns true', async () => {
            const result = usecase.exec('2021-08-09T02:12:51.253Z - info - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Service is started"}\n');
            expect(result).toEqual({
                timestamp: 1628475171253,
                loglevel: LogLevelEnum.INFO,
                transactionId: '9abc55b2-807b-4361-9dbe-aa88b1b2e978',
                details: 'Service is started',
            });
        });
    });

    describe('Not valid string at all', () => {
        it('Throws error', async () => {
            expect(() => usecase.exec('blablabla')).toThrowError('Incorrect line');
        });
    });

    describe('Not valid json', () => {
        it('Throws error', async () => {
            expect(() => usecase.exec('\'2021-08-09T02:12:51.253Z - info - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","detailsService is started"}')).toThrowError();
        });
    });
});
