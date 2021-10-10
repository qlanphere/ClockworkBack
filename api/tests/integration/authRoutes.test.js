const request = require("supertest");
const app = require('../../server');

describe('auth endpoints', () => {
    let api;

    beforeEach(async () => {
        await resetTestDB();
    });

    beforeAll(async () => {
        api = app.listen(5000, () => console.log('test server running on port 5000'))
    });

    afterAll(async () => {
        console.log('gracefully stopping test server');
        await api.close();
    });

    test('can create a new user', async () => {
        const res = await request(api).post('/auth/register').send({
            userName: "user3",
            password: "pass123"
        });
        expect(res.status).toEqual(201);
        expect(res.body.message).toBe("User has been created successfully");

    })

    test('can login', async () => {
        const res = await request(api).post('/auth/login').send({
            userName: "user1",
            password: "abcd"
        });
        expect(res.status).toEqual(200);
        expect(res.body.success).toBe(true);
    })
})
