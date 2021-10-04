const userController = require('../../../controllers/users');
const User = require('../../../models/users');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({send: mockSend, json: mockJson}));
const mockRes = {status: mockStatus};

describe('auth controller', () => {
    beforeEach(() => jest.clearAllMocks());
    
    afterAll(() => jest.resetAllMocks());

    describe('create', () => {
        test('it returns new user with 201 code', async () => {
            let testUser = {
                id: 4,
                userName: 'testUser4',
                password: "hello"
            }
        })
    })
})