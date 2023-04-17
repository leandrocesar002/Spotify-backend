const request = require('supertest');
const startServer = require('../index.js');

let server;

beforeAll(() => {
  server = startServer();
});

afterAll(done => {
  server.close(done);
});

describe('Testes de integração', () => {
  it('Deve retornar uma mensagem de boas-vindas na rota /', async () => {
    const response = await request(server).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('API da Máquina Cervejeira');
  });
});
