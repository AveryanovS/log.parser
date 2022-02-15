import 'reflect-metadata';
import {FilterErrorsUsecaseImpl} from './filter-errors.usecase';
import {LogLevelEnum} from "../dto/log.dto";

describe('Filter errors usecase', () => {

    const usecase = new FilterErrorsUsecaseImpl();

    describe('Happy path', () => {
        it('Returns true', async () => {
            const result = usecase.exec({
                loglevel: LogLevelEnum.ERROR,
                timestamp: new Date().valueOf(),
                transactionId: '1',
                details: 'test',
            })
            expect(result).toBe(true);
        });
    });

    describe('Not an error', () => {
        it('Returns false', async () => {
            const result = usecase.exec({
                loglevel: LogLevelEnum.DEBUG,
                timestamp: new Date().valueOf(),
                transactionId: '1',
                details: 'test',
            })
            expect(result).toBe(false);
        });
    });
});
