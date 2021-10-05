const habitController = require('../../../controllers/habits');
const Habit = require('../../../models/habits');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({send: mockSend, json: mockJson}));
const mockRes = {status: mockStatus};

describe('habit controller', () => {
    beforeEach(() => jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

    describe('index', () => {
        test('it returns habits with 200 status code', async () => {
            let testHabits = ['h1', 'h2'];
            jest.spyOn(Habit, 'all', 'get')
                .mockResolvedValue(testHabits);
            await habitController.index(null, mockRes);
            expect(mockJson).toHaveBeenCalledWith(testHabits)
        })
    });

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
            let testData = {habitId: 5, habitName: "testHabit", frequency: 5, startDate: "2021-10-05", targetDate: "2021-10-06", habitType: "true"};
            jest.spyOn(Habit, 'create')
                .mockResolvedValue(new Habit(testData));
            const mockReq = {body: testData};
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
});
