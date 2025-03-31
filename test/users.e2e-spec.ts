import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/common/services/prisma.service';
import { AuthService } from '../src/auth/auth.service';
import { User } from '@prisma/client';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  let authService: AuthService;
  let testUser: User;
  let accessToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prismaService = moduleFixture.get<PrismaService>(PrismaService);
    authService = moduleFixture.get<AuthService>(AuthService);
    await app.init();

    // Create test user and get access token
    testUser = await prismaService.user.create({
      data: {
        name: 'testuser',
        password: 'hashedpassword', // In real scenario this would be properly hashed
      },
    });

    const authResult = await authService.login({
      userId: testUser.id,
      username: testUser.name,
    });
    accessToken = authResult.accessToken;
  });

  afterAll(async () => {
    await prismaService.user.deleteMany();
    await app.close();
  });

  describe('GET /api/users', () => {
    it('should return all users', () => {
      return request(app.getHttpServer())
        .get('/api/users')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toBeDefined();
          expect(Array.isArray(res.body.data)).toBe(true);
          expect(res.body.data.length).toBeGreaterThan(0);
        });
    });

    it('should return 401 when no token provided', () => {
      return request(app.getHttpServer())
        .get('/api/users')
        .expect(401);
    });
  });

  describe('GET /api/users/:id', () => {
    it('should return a specific user', () => {
      return request(app.getHttpServer())
        .get(`/api/users/${testUser.id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toBeDefined();
          expect(res.body.id).toBe(testUser.id);
          expect(res.body.name).toBe(testUser.name);
        });
    });

    it('should return 404 for non-existent user', () => {
      return request(app.getHttpServer())
        .get('/api/users/999999')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404);
    });
  });

  describe('PATCH /api/users/:id', () => {
    it('should update a user', () => {
      const updateData = {
        name: 'updateduser',
      };

      return request(app.getHttpServer())
        .patch(`/api/users/${testUser.id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send(updateData)
        .expect(200)
        .expect((res) => {
          expect(res.body).toBeDefined();
          expect(res.body.id).toBe(testUser.id);
          expect(res.body.name).toBe(updateData.name);
        });
    });

    it('should return 404 when updating non-existent user', () => {
      const updateData = {
        name: 'updateduser',
      };

      return request(app.getHttpServer())
        .patch('/api/users/999999')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(updateData)
        .expect(404);
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('should delete a user', () => {
      return request(app.getHttpServer())
        .delete(`/api/users/${testUser.id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toBeDefined();
          expect(res.body.id).toBe(testUser.id);
        });
    });

    it('should return 404 when deleting non-existent user', () => {
      return request(app.getHttpServer())
        .delete('/api/users/999999')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404);
    });
  });
});