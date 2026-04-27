import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../app.js';

describe('API Integration Tests', () => {
  let mongoServer;

  // Setup in-memory database before all tests
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });

  // Teardown database after all tests
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  // Clear all collections between tests to ensure TOTAL isolation
  beforeEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany();
    }
  });

  // ─── Health Check ─────────────────────────────────────────────
  describe('GET /', () => {
    it('should return API is Working message', async () => {
      const res = await request(app).get('/');
      expect(res.status).toBe(200);
      expect(res.text).toBe('API is Working');
    });
  });

  // ─── Product Routes ───────────────────────────────────────────
  describe('GET /api/product/list', () => {
    it('should return success with an empty array initially', async () => {
      const res = await request(app).get('/api/product/list');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body.products).toEqual([]);
    });
  });

  // ─── User Auth Routes ─────────────────────────────────────────
  describe('User Registration & Login', () => {
    const testUser = {
      name: 'Test User',
      email: 'test@blumart.com',
      password: 'password123'
    };

    it('should reject registration with missing fields (400)', async () => {
      const res = await request(app)
        .post('/api/user/register')
        .send({ email: 'test@test.com' });
      
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should register a new user successfully (201)', async () => {
      const res = await request(app)
        .post('/api/user/register')
        .send(testUser);
      
      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.user.email).toBe(testUser.email);
    });

    it('should reject registration if user already exists (409)', async () => {
      // First registration
      await request(app).post('/api/user/register').send(testUser);
      
      // Second registration with same email
      const res = await request(app)
        .post('/api/user/register')
        .send(testUser);
      
      expect(res.status).toBe(409);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe("User Already Exists");
    });

    it('should login successfully with correct credentials (200)', async () => {
      // Register first
      await request(app).post('/api/user/register').send(testUser);

      // Login
      const res = await request(app)
        .post('/api/user/login')
        .send({ email: testUser.email, password: testUser.password });
      
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.header['set-cookie']).toBeDefined(); // Token cookie should be set
    });

    it('should reject login with wrong credentials (401)', async () => {
      // Register first
      await request(app).post('/api/user/register').send(testUser);

      const res = await request(app)
        .post('/api/user/login')
        .send({ email: testUser.email, password: 'wrongpassword' });
      
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });
  });

  // ─── Auth Guard ───────────────────────────────────────────────
  describe('GET /api/user/is-auth', () => {
    it('should return 401 for unauthenticated request', async () => {
      const res = await request(app).get('/api/user/is-auth');
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('should return 200 and user data for authenticated request', async () => {
        // Register and Login to get cookie
        await request(app).post('/api/user/register').send({
            name: 'Auth Test',
            email: 'auth@test.com',
            password: 'password123'
        });
        const loginRes = await request(app)
            .post('/api/user/login')
            .send({ email: 'auth@test.com', password: 'password123' });
        
        const cookie = loginRes.header['set-cookie'];

        const res = await request(app)
            .get('/api/user/is-auth')
            .set('Cookie', cookie);
        
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.user.email).toBe('auth@test.com');
    });
  });
});


