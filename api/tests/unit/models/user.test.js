const User = require('../../../models/users');

// jest.mock('../../../models/users');

const pg = require('pg');
jest.mock('pg');

const db = require('../../../dbConfig/init');
// checking if the functions are querying the the db successfully

describe('users', () => {
    beforeEach(() => jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

    describe('findById', () => {
        test('it resolves with user on successful db query', async () => {
            let testData = {userId: 3, userName: 'user1', passwordHash: "pass123", badgePoints: 0};
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [testData]});
            const result = await User.findById(3);
            expect(result).toBeInstanceOf(User);
        })
    })

    
    describe('create', () => {
        test('it resolves with a user on successful db query', async () => {
            let testData = {userId: 1, userName: 'testUser2', passwordHash: "pass123", badgePoints: 0};
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [testData]});
                const result = await User.create(testData);
                expect(result).toBeInstanceOf(User);
        })
    });

    describe('all', () => {
        test('it resolves with users on a successful db query', async () => {
            let testData = [{}, {}]
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: testData});
            const result = await User.all;
            expect(result).toHaveLength(2);
        })
    });

    describe('findByUserName', () => {
        test('it resolves with a user on a succesful db query', async () => {
            let testData = {userId: 3, userName: 'user3', passwordHash: "pass123", badgePoints: 0};
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [testData]});
            const result = await User.findByUserName(testData.userName);
            expect(result).toBeInstanceOf(User);
        })
    });

    //fails
    describe('update', () => {
        test('it updates a user on a successful db query', async () => {
            let testData = {userId: 4, userName: 'user4', passwordHash: "pass123", badgePoints: 0};
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [testData]});
                const result = await User.update();
                expect(result).toBeInstanceOf(User);
        })
    })

});