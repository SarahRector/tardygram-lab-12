const { getAgent } = require('../data/data-helpers');
const request = require('supertest');
const app = require('../lib/app');

describe('tardygram routes', () => {

  it('lets a user sign up via POST', async() => {

    const response = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'test@test.com',
        password: 'password',
        profilePhoto: 'hotmess.jpg'
      });
    expect(response.body).toEqual({
      id: expect.any(String),
      email: 'test@test.com',
      profilePhoto: 'hotmess.jpg'
    });
  });

  it('logs in a user via POST', async() => {

    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'test0@test.com',
        password: 'password0'
      });

    expect(response.body).toEqual({
      id: expect.any(String),
      email: 'test0@test.com',
      profilePhoto: 'hotmess.jpg'
    });
  });

  it('verifies a user via GET', async() => {

    const response = await getAgent()
      .get('/api/v1/auth/verify');

    expect(response.body).toEqual({
      id: expect.any(String),
      email: 'test0@test.com',
      profilePhoto: 'hotmess.jpg'
    });

    const responseWithoutAUser = await request(app)
      .get('/api/v1/auth/verify');

    expect(responseWithoutAUser.body).toEqual({
      status: 418,
      message: 'jwt must be provided'
    });
  });
});
