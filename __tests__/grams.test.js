const { getAgent } = require('../data/data-helpers');
const request = require('supertest');
const app = require('../lib/app');
const Gram = require('../lib/models/gram');

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
});
