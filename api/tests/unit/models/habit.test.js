const Habit = require('../../../models/habits');
const User = require('../../../models/users');

jest.mock('../../../models/users');

const pg = require('pg');
jest.mock('pg');

const db = require('../../../dbConfig/init');

describe('habits', () => {
    beforeEach(() => jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

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
            let habitData = {habitId: 4, habitName: 'walkl', frequency: 1, targetDate: "2021-10-06", habitType: "true"};
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [habitData]});
                const result = await Habit.create(habitData);
                expect(result).toBeInstanceOf(Habit);
        })
    })

    describe('findUserHabits', () =>{
        test('it resolves with a habit on a successful db query', async () => {
            let habitData = {habitId: 5, habitName: 'eat', frequency: 3, targetDate: "2021-10-06", habitType: "true", userId: 1}
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [habitData]});
            const result = await Habit.findUserHabits(1);
            expect(result).toBeInstanceOf(Array);
        })
    })

    describe('update', () => {
        test('it resolves with an updated habit on a successful db query', async () => {
            let habitData = {habitId: 6, habitName: 'dream', frequency: 3, targetDate: "2021-10-06", habitType: "true", userId: 1}
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [{
                    habitId: 6, habitName: 'dream', frequency: 8, targetDate: "2021-10-10", habitType: "true", userId: 1
                }]});
            const result = await Habit.update(8, "2021-10-10", 6);
            expect(result.frequency).toBe(8)
        })
    });

    describe('destroy', () => {
        test('it deletes a habit', async () => {
            let habitData = new Habit({habitId: 7, habitName: 'run', frequency: 3, targetDate: "2021-11-10", habitType: "true", userId: 1});
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce('Habit was deleted');
            const result = await habitData.destroy();
            expect(result).toBe('Habit was deleted'); 
        })
    })
})