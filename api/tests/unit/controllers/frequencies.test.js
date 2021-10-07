const freqController = require('../../../controllers/frequency');
const Freq = require('../../../models/frequency');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({send: mockSend, json: mockJson}));
const mockRes = {status: mockStatus};

describe('freq controller', () => {
    beforeEach(() => jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

    describe('updateFreq', () => {
        test('it updates freq with a 201 status code', async () => {
            let freqData = {habitId: 3, frequencyType: 'daily', lastDoneDate: "2021-10-06", frequency: 4, streak: 2};
            jest.spyOn(Freq, 'updateFreq')
                .mockResolvedValue({habitId: 3, frequencyType: 'daily', frequency: 4, lastDoneDate: "2021-10-07", streak: 3});
            const mockReq = {params: {id: 3}, body: {lastDoneDate: "2021-10-07", streak: 2}};
            await authController.updateFreq(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith({ freq: {habitId: 3, frequencyType: 'daily', frequency: 4, lastDoneDate: "2021-10-07", streak: 3}});
        })
    });

    describe('indexFreqs', () => {
        test('it returns all users with 200 status code', async () => {
            let testData = [{}, {}, {}];
            jest.spyOn(Freq, 'indexFreqs')
                .mockResolvedValueOnce(testData);
            const mockReq = {};
            await userController.indexFreqs(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith({testData});
        })
    });
})