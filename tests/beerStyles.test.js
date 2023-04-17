const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const beerRoutes = require('../routes/beerStyles');

const app = express();
app.use(bodyParser.json());
app.use('/beer-styles', beerRoutes);

describe('GET /beer-styles', () => {
  it('should return all beer styles', async () => {
    const response = await request(app).get('/beer-styles');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});

describe('GET /beer-styles/:id', () => {
  it('should return the beer style with the given id', async () => {
    const response = await request(app).get('/beer-styles/1');
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Pilsen');
  });

  it('should return a 404 error if the beer style is not found', async () => {
    const response = await request(app).get('/beer-styles/999');
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Style not found');
  });
});

describe('POST /beer-styles', () => {
  it('should create a new beer style', async () => {
    const newStyle = { name: 'New Style', minTemp: -10, maxTemp: 10 };
    const response = await request(app)
      .post('/beer-styles')
      .send(newStyle);

    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
    expect(response.body.name).toBe('New Style');
    expect(response.body.minTemp).toBe(-10);
    expect(response.body.maxTemp).toBe(10);
  });
});

describe('PUT /beer-styles/:id', () => {
  it('should update the beer style with the given id', async () => {
    const updatedStyle = { name: 'Updated Style' };
    const response = await request(app)
      .put('/beer-styles/1')
      .send(updatedStyle);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Updated Style');
  });

  it('should return a 404 error if the beer style is not found', async () => {
    const updatedStyle = { name: 'Updated Style' };
    const response = await request(app)
      .put('/beer-styles/999')
      .send(updatedStyle);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Style not found');
  });

  it('should return a 400 error if no fields are provided for update', async () => {
    const updatedStyle = {};
    const response = await request(app)
      .put('/beer-styles/1')
      .send(updatedStyle);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Bad request');
  });
});

describe('DELETE /beer-styles/:id', () => {
  it('should delete the beer style with the given id', async () => {
    const response = await request(app).delete('/beer-styles/1');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Style deleted');
  });

  it('should return a 404 error if the beer style is not found', async () => {
    const response = await request(app).delete('/beer-styles/999');
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Style not found');
  });
});