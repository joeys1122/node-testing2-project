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
    test('returns a list of three pokemon', async () => {
      const res = await request(server).get('/pokemon');
      expect(res.body).toHaveLength(3);
    });
    test('returns a json object', async () => {
      const res = await request(server).get('/pokemon');
      expect(res.type).toBe('application/json');
    });
    test('200 status code', async () => {
      const res = await request(server).get('/pokemon');
      expect(res.status).toBe(200);
    });
  });

  describe('[GET] /pokemon/:id', () => {
    test('returns one pokemon', async () => {
      const res = await request(server).get('/pokemon/1');
      expect(res.body).toHaveLength(1);
    });
    test('returns correct pokemon', async () => {
      const res = await request(server).get('/pokemon/1');
      expect(res.body[0]).toHaveProperty('id', 1);
      expect(res.body[0]).toHaveProperty('name', 'squirtle');
    });
    test('404 if invalid id is entered', async () => {
      const res = await request(server).get('/pokemon/0');
      expect(res.status).toBe(404);
    });
  });

  describe('[POST] /pokemon', () => {
    test('returns the new pokemon', async () => {
      const res = await request(server).post('/pokemon').send({name:'blastoise'});
      expect(res.body).toMatchObject({name:'blastoise'})
    });
    test('422 if no name is entered', async () => {
      const res = await request(server).post('/pokemon').send({});
      expect(res.status).toBe(422);
    });
    test('201 status code if successful', async () => {
      const res = await request(server).post('/pokemon').send({name:'blastoise'});
      expect(res.status).toBe(201);
    });
  });

  describe('[DELETE] /pokemon/:id', () => {
    test('returns a deleted message if successful', async () => {
      const res = await request(server).delete('/pokemon/1');
      expect(res.body).toMatchObject({message:'pokemon with id 1 deleted'});
    });
  });
});