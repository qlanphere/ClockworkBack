const request = require("supertest");
const app = require('../../server')

describe('habit endpoints', () => {
    let api;
    let token;
    let testData = {
        habitName: 'testHabit',
        frequency: 4,
        targetDate: "2022-10-07",
        habitType: true,
        userId: 1
    };
    beforeEach(async () => {
        await resetTestDB();
    });

    beforeAll(async () => {
        api = app.listen(5000, () => console.log('test server running on port 5000'))
        const getToken = await request(api).post('/auth/login').send({
            userName: "user1",
            password: "abcd"
        });
        token = getToken.body.token;
    });

    afterAll(async () => {
        console.log('gracefully stopping test server');
        await api.close();
    });

    test('should not allow getting a single habit', async () => {
        const res = await request(api).get('/habits/1').set('Authorization', token);
        expect(res.status).toEqual(200);
    });

    test('should not allow getting a list of habits from a user', async () => {
        const res = await request(api).get('/habits/user/1');
        expect(res.status).toEqual(403);
    });

    test('should not allow posting a habit', async () => {
        const res = await request(api).post('/habits/').send(testData);
        expect(res.status).toEqual(403);
    });

    test('edit the frequency and target date of a habit', async () => {
        const res = await request(api).patch('/habits/1').set('Authorization', token).send({
            frequency: 6,
            targetDate: "2021-12-30"
        });
        expect(res.status).toEqual(204);
    });

    test('should not allow deleting a habit', async () => {
        const res = await request(api).delete('/habits/2');
        expect(res.status).toEqual(403);
    })
})