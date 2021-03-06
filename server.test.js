const { app } = require('./server.js');
const request = require('supertest');
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTgzMzU2MDY4fQ.n76uPkhar_U5CbJP-ZBw4hRONH7wINMgtTGh6aVQhM8';

describe('/POST /api/auth/signup', () => {
    test('It should respond with an object of the correct shape',
    // get the done function to call after the test
        async (done) => {
            // feed our express app to the supertest request
            const response = await request(app)
                // and hit out express app's about route with a /GET
                .post('/api/auth/signup')
                .send({
                    name: 'name',
                    email: 'email',
                    password: 'password'
                });
            // check to see if the response is what we expect
            expect(response.body).toEqual({
                id: expect.any(Number),
                name: expect.any(String),
                email: expect.any(String), 
                token: expect.any(String)
            });
            // it should have a status of 200
            expect(response.statusCode).toBe(200);
            done();
        });
});

describe('/GET /api/user/saved', () => {
    test('It should respond with an object of the correct shape',
    // get the done function to call after the test
        async (done) => {
            // feed our express app to the supertest request
            const response = await request(app)
                // and hit out express app's about route with a /GET
                .get('/api/user/saved')
                .set('Authorization', token);
            // check to see if the response is what we expect
            expect(response.body[0]).toEqual({
                id: expect.any(Number),
                board_name: expect.any(String), 
                game_board: expect.any(String), 
                scheme: expect.any(String),
                mode: expect.any(String),
                user_id: expect.any(Number)
            });
            // it should have a status of 200
            expect(response.statusCode).toBe(200);
            done();
        });
});

describe('/POST /api/user/saved', () => {
    test('It should respond with an object of the correct shape',
    // get the done function to call after the test
        async (done) => {
            // feed our express app to the supertest request
            const response = await request(app)
                // and hit out express app's about route with a /GET
                .post('/api/user/saved')
                .send({
                    board_name: 'something24',
                    game_board: 'somethingelse2',
                    scheme: 'scheming',
                    mode: 'moding'
                })
                .set('Authorization', token);
            // check to see if the response is what we expect
            expect(response.body).toEqual({
                id: expect.any(Number),
                board_name: expect.any(String), 
                game_board: expect.any(String), 
                scheme: expect.any(String),
                mode: expect.any(String),
                user_id: expect.any(Number)
            });
            // it should have a status of 200
            expect(response.statusCode).toBe(200);
            done();
        });
});

describe('/PUT /api/user/saved/25', () => {
    test('It should respond with an object of the correct shape',
    // get the done function to call after the test
        async (done) => {
            // feed our express app to the supertest request
            const response = await request(app)
                // and hit out express app's about route with a /GET
                .put('/api/user/saved/5')
                .send({
                    game_board: 'somethingelse2',
                    scheme: 'scheming',
                    mode: 'moding'
                })
                .set('Authorization', token);
            // check to see if the response is what we expect
            expect(response.body).toEqual({
                id: expect.any(Number),
                board_name: expect.any(String), 
                game_board: expect.any(String), 
                scheme: expect.any(String),
                mode: expect.any(String),
                user_id: expect.any(Number)
            });
            // it should have a status of 200
            expect(response.statusCode).toBe(200);
            done();
        });
});

describe('/DELETE /api/user/saved/25', () => {
    test('It should respond with an object of the correct shape',
    // get the done function to call after the test
        async (done) => {
            // feed our express app to the supertest request
            const response = await request(app)
                // and hit out express app's about route with a /GET
                .delete('/api/user/saved/5')
                .set('Authorization', token);
            // check to see if the response is what we expect
            expect(response.body[0]).toEqual({
                id: expect.any(Number),
                board_name: expect.any(String), 
                game_board: expect.any(String), 
                scheme: expect.any(String),
                mode: expect.any(String),
                user_id: expect.any(Number)
            });
            // it should have a status of 200
            expect(response.statusCode).toBe(200);
            done();
        });
});