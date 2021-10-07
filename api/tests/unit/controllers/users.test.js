const userController = require('../../../controllers/users');
const User = require('../../../models/users');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({send: mockSend, json: mockJson}));
const mockRes = {status: mockStatus};

describe('user controller', () => {
    beforeEach(() => jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

    describe('showIndex', () => {
        test('it returns a user with a 200 status code', async () => {
            let testData = {userId: 3, userName: 'testUser3', passwordHash: "pass123", badgePoints: 3}
            jest.spyOn(User, 'findById')
                .mockResolvedValueOnce(new User(testData));
            
            const mockReq = { params: {id: 3}};
            await userController.showIndex(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(new User(testData));
        })
    });
//fails
    describe('show',() => {
        test('it returns all users with 200 status code', async () => {
            let testData = [{}, {}, {}];
            jest.spyOn(User, 'show')
                .mockResolvedValueOnce(testData);
            const mockReq = {};
            await userController.show(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200)
        })
    })
})