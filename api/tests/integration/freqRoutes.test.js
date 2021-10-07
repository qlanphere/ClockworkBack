const request = require("supertest");
const app = require('../../server')

describe('freq endpoints', () => {
    let api;
    let token;

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

    test('should get the frequencies', async () => {
        const res = await request(api).get('/frequency/').set('Authorization', token);
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(2);
    });

    test('should update the frequency', async () => {
        const res = await request(api).patch('/frequency/1').set('Authorization', token).send({
                habitId: 1,
                lastDoneDate: "2021-10-07",
                streak: 1
            });
        expect(res.status).toBe(200);
        expect(res.body.streak).toBe(1);
    });
});