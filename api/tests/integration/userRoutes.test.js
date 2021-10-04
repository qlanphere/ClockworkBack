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

    test('find and retrieve a single user', async () => {
        
    })
})