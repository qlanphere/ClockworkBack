const request = require('supertest');
const app = require("../../server")

describe('user endpoints', () => {
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

    test('find all users', async () => {
        const res = await request(api).get('/users/');
        expect(res.status).toEqual(200);
        expect(res.body.length).toEqual(2);
    });

    test('return a single user', async () => {
        const res = await request(api).get('/users/1');
        expect(res.status).toEqual(200);
        expect(res.body.userId).toBe(1);
    });
//fails
    test('update badge points for a single user', async () => {
        const res = await request(api).patch('/users/1');
        expect(res.status).toEqual(204);
        expect(res.body.badgePoints).toBeGreaterThan(5);
    });
})