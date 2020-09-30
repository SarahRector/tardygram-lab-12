const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/user-service');

describe('tardygram routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('lets a user sign up via POST', async() => {
    jest.setTimeout(30000);
    const response = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'sarah@rector.com',
        password: 'wordpass',
        profilePhoto: 'hotmess.jpg'
      });
    expect(response.body).toEqual({
      id: expect.any(String),
      email: 'sarah@rector.com',
      profilePhoto: 'hotmess.jpg'
    });
  });

  it('logs in a user via POST', async() => {
    jest.setTimeout(30000);
    const user = await UserService.create({
      email: 'sarah@rector.com',
      password: 'wordpass',
      profilePhoto: 'hotmess.jpg'
    });

    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'sarah@rector.com',
        password: 'wordpass'
      });

    expect(response.body).toEqual({
      id: user.id,
      email: 'sarah@rector.com',
      profilePhoto: 'hotmess.jpg'
    });
  });

  it('verifies a user via GET', async() => {
    jest.setTimeout(30000);
    const agent = request.agent(app);
    await agent
      .post('/api/v1/auth/signup')
      .send({
        email: 'sarah@rector.com',
        password: 'wordpass',
        profilePhoto: 'hotmess.jpg'
      });

    const response = await agent
      .get('/api/v1/auth/verify');

    expect(response.body).toEqual({
      id: expect.any(String),
      email: 'sarah@rector.com',
      profilePhoto: 'hotmess.jpg'
    });

    const responseWithoutAUser = await request(app)
      .get('/api/v1/auth/verify');

    expect(responseWithoutAUser.body).toEqual({
      status: 500,
      message: 'jwt must be provided'
    });
  });
});
