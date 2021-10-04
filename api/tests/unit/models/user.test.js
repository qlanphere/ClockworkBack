const User = require('../../../models/users');

jest.mock('../../../models/users');

const pg = require('pg');
jest.mock('pg');

const db = require('../../../dbConfig');
// checking if the functions are querying the the db successfully

describe('users', () => {
    beforeEach(() => jest.clearAllMocks());

    afterEach(() => jest.resetAllMocks());

    describe('findById', () => {
        test('it resolves with user on successful db query', async () => {
            let userData = {id: 1, userName: 'testUser1', badgePoints: 0};
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [userData]});
            const result = await User.findById(1);
            expect(result).toBeInstanceOf(User);
        })
    });

    
    describe('create', () => {
        test('it resolves with a user on successful db query', async () => {
            let userData = {id: 2, userName: 'testUser2', badgePoints: 5};
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [userData]});
                const result = await User.create(userData);
                expect(result).toBeInstanceOf(User);
        })
    })

})