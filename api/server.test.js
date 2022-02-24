const request = require('supertest');
const db = require('../data/db-config');
const server = require('./server');

describe('sanity check', () => {
  test('check testing env', () => {
    expect(process.env.NODE_ENV).toBe('testing');
  });
});

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy()
})

describe('endpoint tests', () => {

  describe('[GET] /pokemon', () => {
    test('returns a list of three pokemon', () => {});
    test('returns a json object', () => {});
    test('200 status code', () => {});
  });

  describe('[GET] /pokemon/:id', () => {
    test('returns one pokemon', () => {});
    test('returns correct pokemon', () => {});
    test('404 if invalid id is entered', () => {});
  });

  describe('[POST] /pokemon', () => {
    test('returns the new pokemon', () => {});
    test('422 if no name is entered', () => {});
    test('201 status code if successful', () => {});
  });

  describe('[DELETE] /pokemon/:id', () => {
    test('returns a deleted message if successful', () => {});
  });
});