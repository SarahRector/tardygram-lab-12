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
    const response = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'sarah@rector.com',
        password: 'wordpass'
      });
    expect(response.body).toEqual({
      id: expect.any(String),
      email: 'sarah@rector.com'
    });
  });
});
