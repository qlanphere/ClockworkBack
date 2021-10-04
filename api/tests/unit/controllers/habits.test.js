const habitController = require('../../../controllers/habits');
const Habit = require('../../../models/habits');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({send: mockSend, json: mockJson}));
const mockRes = {status: mockStatus};

describe('habit controller', () => {
    beforeEach(() => jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

    describe('show')

    describe('create')

    describe('destroy')
});
