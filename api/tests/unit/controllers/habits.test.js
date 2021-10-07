const habitController = require('../../../controllers/habits');
const Habit = require('../../../models/habits');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({send: mockSend, json: mockJson}));
const mockRes = {status: mockStatus};

describe('habit controller', () => {
    beforeEach(() => jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

    describe('show', () => {
        test('it returns habit with a 200 status code', async () => {
            let testData = {habitId: 5, habitName: "testHabit", frequency: 5, startDate: "2021-10-05", targetDate: "2021-10-06", habitType: "true"};
            jest.spyOn(Habit, 'findById')
                .mockResolvedValue(new Habit(testData));
            const mockReq = { params: {id: 5}};
            await habitController.show(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(new Habit(testData));
        })
    });

    describe('create', () => {
        test('it returns a new habit with a 201 status code', async () => {
            let testData = {habitId: 5, habitName: "testHabit", frequency: 5, startDate: "2021-10-05", targetDate: "2021-10-07", habitType: "true"};
            let freqData = {habitId: 5, frequencyType: 'daily', lastDoneDate: "2021-10-06", frequency: 4, streak: 2};
            jest.spyOn(Habit, 'create')
                .mockResolvedValue(new Habit(testData));
            const mockReq = {body: testData, freqData}
            await habitController.create(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(201);
            expect(mockJson).toHaveBeenCalledWith(new Habit(testData));
        })
    });

    describe('destroy', () => {
        test('it returns a 204 status code on successful deletion', async () => {
            jest.spyOn(Habit.prototype, 'destroy')
                .mockResolvedValue('Deleted');
            const mockReq = { params: {id: 5}};
            await habitController.destroy(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(204);
        })
    });
    //fails
    describe('getHabits', () => {
        test('it returns habits on a 200 status code', async () => {
            let testHabits = [
                {habitId: 6, habitName: "testHabit1", frequency: 5, startDate: "2021-10-05", targetDate: "2021-10-06", habitType: "true", userId: 1},
                {habitId: 7, habitName: "testHabit2", frequency: 8, startDate: "2021-10-05", targetDate: "2021-10-06", habitType: "true", userId: 1}
            ];
            jest.spyOn(Habit, 'getHabits')
                .mockResolvedValue(testHabits);
            const mockReq = { params: {id: 1}};
            await habitController.getHabits(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(h => new Habit(h))
        })
    })

    describe('update', () => {
        test('it updates a habit with a 204 code', async () => {
            let testData = {habitId: 6, habitName: "testHabit1", frequency: 5, startDate: "2021-10-05", targetDate: "2021-10-06", habitType: "true", userId: 1};
            jest.spyOn(Habit, 'update')
                .mockResolvedValue({habitId: 6, habitName: "testHabit1", frequency: 8, startDate: "2021-10-05", targetDate: "2021-10-10", habitType: "true", userId: 1});
            const mockReq = {params: {id: 6}, body: {frequency: 8, targetDate: "2021-10-10"}};
            await habitController.update(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(204)
        })
    })
});
