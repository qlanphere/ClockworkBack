const Habit = require('../../../models/habits');
const User = require('../../../models/users');

jest.mock('../../../models/users');

const pg = require('pg');
jest.mock('pg');

const db = require('../../../dbConfig/init');

describe('habits', () => {
    beforeEach(() => jest.clearAllMocks());

    afterEach(() => jest.resetAllMocks());

    describe('all', () => {
        test('it resolves with users on a successful db query', async () => {
            let habitData = [
                {
                    habitId: 1,
                    habitName: "water",
                    frequency: 8,
                    startDate: "2021-10-05",
                    targetDate: "2021-10-06",
                    habitType: "true"
                },
                {
                    habitId: 2,
                    habitName: "smoking",
                    frequency: 0,
                    startDate: "2021-10-05",
                    targetDate: "2021-12-05",
                    habitType: "false"
                }
            ];
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: habitData});
            const result = await Habit.all;
            expect(result).toHaveLength(2);
        })
    })

    describe('findById', () => {
        test('it resolves with habit on successful db query', async () => {
            let habitData = {habitId: 3, habitName: 'sleep', frequency: 12, startDate: "2021-10-05", targetDate: "2021-10-06", habitType: "true"};
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [habitData]});
            const result = await Habit.findById(3);
            expect(result).toBeInstanceOf(Habit);
        })
    })

    describe('create', () => {
        test('it resolves with a habit on successful db query', async () => {
            let habitData = {habitId: 4, habitName: 'walkl', frequency: 1, startDate: "2021-10-05", targetDate: "2021-10-06", habitType: "true"};
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [habitData]});
                const result = await User.create(habitData);
                expect(result).toBeInstanceOf(Habit);
        })
    })
})