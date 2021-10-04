const userController = require('../../../controllers/users');
const User = require('../../../models/users');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({send: mockSend, json: mockJson}));
const mockRes = {status: mockStatus};

describe('user controller', () => {
    beforeEach(() => jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

    describe('show', () => {
        test('it returns a user with a 200 status code', async () => {
            jest.spyOn(User, 'findById')
                .mockResolvedValue(new User({id: 3, userName: 'testUser3', badgePoints: 3}));
            
            const mockReq = { params: {id: 1}};
            await userController.show(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith({
                id: 3,
                userName: 'testUser3',
                badgepoints: 3
            });
        })
    });
})