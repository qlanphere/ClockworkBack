const Freq = require('../../../models/frequency');

const pg = require('pg');
jest.mock('pg');

const db = require('../../../dbConfig/init');

describe('frequency', () => {
    beforeEach(() => jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

    describe('all', () => {
        test('it resolves with frequencies on a db query', async () => {
            let freqData = [{habitId: 1, frequencyType: 'daily', frequency: 4, streak: 0}, {habitId: 2, frequencyType: 'weekly', frequency: 7, streak: 0}];
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: freqData});
            const result = await Freq.all;
            expect(result).toBeInstanceOf(Array);
        })
    });

    describe('findById', () => {
        test('it resolves with freq on successful db query', async () => {
            let freqData = {habitId: 3, frequencyType: 'daily', frequency: 4, streak: 0};
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [freqData]});
            const result = await Freq.findById(3);
            expect(result).toBeInstanceOf(Freq);
        })
    });

    describe('create', () => {
        test('it resolves with a freq on successful db query', async () => {
            let freqData = {habitId: 3, frequencyType: 'daily', frequency: 4, streak: 0};
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [freqData]});
                const result = await Freq.create(freqData);
                expect(result).toBeInstanceOf(Freq);
        })
    });

    describe('update', () => {
        test('it resolves with an updated freq on a successful db query', async () => {
            let freqData = {habitId: 3, frequencyType: 'daily', frequency: 4, streak: 0};
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [{habitId: 3, frequencyType: 'daily', frequency: 4, lastDoneDate: "2021-10-10", streak: 1}]});
            const result = await Freq.update(3, "2021-10-10", 1);
            expect(result.streak).toBe(1);
        })
    });
})