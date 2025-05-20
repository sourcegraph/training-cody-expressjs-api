const request = require('supertest');
const express = require('express');
const apiRouter = require('../routes/api');

// Create a minimal express app for testing
const app = express();
app.use('/api', apiRouter);

describe('Pet API Endpoints', () => {
  describe('GET /api/pets/:id', () => {
    it('returns a pet with the specified ID', async () => {
      const testId = '12345';
      const response = await request(app)
        .get(`/api/pets/${testId}`)
        .expect('Content-Type', /json/)
        .expect(200);

      // Verify the response contains a pet with the specified ID
      expect(response.body).toHaveProperty('id', testId);
      
      // Verify the pet has all required properties
      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('category');
      expect(response.body).toHaveProperty('photoUrls');
      expect(response.body).toHaveProperty('tags');
      expect(response.body).toHaveProperty('status');
      
      // Verify category has the expected structure
      expect(response.body.category).toHaveProperty('id');
      expect(response.body.category).toHaveProperty('name');
      
      // Verify the status is one of the allowed values
      expect(['available', 'pending', 'sold']).toContain(response.body.status);
    });
  });
});