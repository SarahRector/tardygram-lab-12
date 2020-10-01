const { getAgent } = require('../data/data-helpers');
const request = require('supertest');
const app = require('../lib/app');
const Gram = require('../lib/models/gram');
const User = require('../lib/models/user');

describe('grams routes', () => {
  it('creates a gram via POST', async() => {
    const response = await getAgent()
      .post('/api/v1/grams')
      .send({
        photoUrl: 'testgram.com',
        caption: 'My first gram',
        tags: '#test'
      });

    expect(response.body).toEqual({
      id: expect.any(String),
      photoUrl: 'testgram.com',
      caption: 'My first gram',
      tags: '#test',
      userId: expect.any(String)
    });
  });

  it('finds a gram by id with the user email via GET', async() => {
    const gram = await Gram.findById(1);
    const response = await request(app)
      .get('/api/v1/grams/1');

    expect(response.body).toEqual({
      ...gram,
      email: expect.any(String)
    });
  });
});
