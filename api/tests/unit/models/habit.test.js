const Habit = require('../../../models/habits');
const User = require('../../../models/users');

jest.mock('../../../models/users');

const pg = require('pg');
jest.mock('pg');

const db = require('../../../dbConfig');

describe('habits', () => {
    beforeEach(() => jest.clearAllMocks());

    afterEach(() => jest.resetAllMocks());

    describe('findById')

    describe('create')

    describe('destroy')
})