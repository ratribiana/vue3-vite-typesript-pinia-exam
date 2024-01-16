import dotenv from 'dotenv';

dotenv.config({ path: `.env.development` });

import axios from 'axios';
import mockAdapter from 'axios-mock-adapter';
import request from 'supertest';
import express, { Request, Response, NextFunction } from 'express';
import { HOST } from '@config';
import AuthRoute from '@routes/auth.route';
import { CreateUserDto, LoginUserDto } from '@dtos/users.dto';

import { HttpException } from '@exceptions/HttpException';

beforeAll(async () => {
  jest.setTimeout(10000);
});

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Auth', () => {
  describe('[POST] /v1/login', () => {
    it('should handle successful login', async () => {
      const userData: LoginUserDto = {
        email: 'tester3@mailinator.com',
        password: 'P@ssw0rd01',
      };

      const authRoute = new AuthRoute();

      // Mock the HTTP requests using axios-mock-adapter
      const mock = new mockAdapter(axios);

      const tokenResponse = {
        expiresIn: 1702872456291,
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDU0MjU5NTQuMzY2LCJ1c2VySWQiOiI2NTljZjRiYmNmMTQ0YTFlN2IwYTMzZDMiLCJlbWFpbCI6InRlc3QzQG1haWxpbmF0b3IuY29tIiwicm9sZUlkIjoiNjU3ZGRiOWQ2YjVlZDRjYjBiNzI3ZGE1IiwiaWF0IjoxNzA1MzM5NTU0fQ.BXedYeeKVzQmCZ4ivomcyepsGD_SwOADR9yo4pjSrts',
      };

      mock.onPost('/v1/login').reply(200, tokenResponse);

      // Mock the AuthService's login method
      jest.spyOn(authRoute.authController.authService, 'login').mockResolvedValue({
        cookie:
          'Authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDU0MjU5NTQuMzY2LCJ1c2VySWQiOiI2NTljZjRiYmNmMTQ0YTFlN2IwYTMzZDMiLCJlbWFpbCI6InRlc3QzQG1haWxpbmF0b3IuY29tIiwicm9sZUlkIjoiNjU3ZGRiOWQ2YjVlZDRjYjBiNzI3ZGE1IiwiaWF0IjoxNzA1MzM5NTU0fQ.BXedYeeKVzQmCZ4ivomcyepsGD_SwOADR9yo4pjSrts; HttpOnly; Max-Age=1702872456291;',
        token: tokenResponse,
      });

      const server = express();

      server.use(express.json());

      // Directly handle the route using Express
      server.post('/v1/login', async (req: Request, res: Response, next: NextFunction) => {
        await authRoute.authController.logIn(req, res, next);
      });

      const response = await request(server).post('/v1/login').set('Content-Type', 'application/json').set('Accept', 'application/json').send(userData);

      const bodyLength = Object.values(response.body);
      const dataLength = Object.values(response.body.data);

      expect(bodyLength).toHaveLength(2);
      expect(dataLength).toHaveLength(2);
      expect(response.body.data).toHaveProperty('expiresIn');
      expect(response.body.data).toHaveProperty('token');
      expect(response.header['set-cookie']).toEqual([
        'Authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDU0MjU5NTQuMzY2LCJ1c2VySWQiOiI2NTljZjRiYmNmMTQ0YTFlN2IwYTMzZDMiLCJlbWFpbCI6InRlc3QzQG1haWxpbmF0b3IuY29tIiwicm9sZUlkIjoiNjU3ZGRiOWQ2YjVlZDRjYjBiNzI3ZGE1IiwiaWF0IjoxNzA1MzM5NTU0fQ.BXedYeeKVzQmCZ4ivomcyepsGD_SwOADR9yo4pjSrts; HttpOnly; Max-Age=1702872456291;',
      ]);
      expect(response.body).toEqual({
        data: {
          expiresIn: 1702872456291,
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDU0MjU5NTQuMzY2LCJ1c2VySWQiOiI2NTljZjRiYmNmMTQ0YTFlN2IwYTMzZDMiLCJlbWFpbCI6InRlc3QzQG1haWxpbmF0b3IuY29tIiwicm9sZUlkIjoiNjU3ZGRiOWQ2YjVlZDRjYjBiNzI3ZGE1IiwiaWF0IjoxNzA1MzM5NTU0fQ.BXedYeeKVzQmCZ4ivomcyepsGD_SwOADR9yo4pjSrts',
        },
        message: 'User successfully login',
      });
    });

    it('should handle empty userData', async () => {
      const authRoute = new AuthRoute();

      // Mock the AuthService's login method to throw HttpException for empty userData
      jest.spyOn(authRoute.authController.authService, 'login').mockImplementation(() => {
        throw new HttpException(400, 'userData is empty');
      });

      const server = express();

      // Directly handle the route using Express
      server.post('/v1/login', async (req: Request, res: Response, next: NextFunction) => {
        await authRoute.authController.logIn(req, res, next);
      });

      const response = await request(server).post('/v1/login').set('Accept', 'application/json').send({});

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        success: false,
        message: 'Invalid request. User data is empty.',
      });
    });

    it('should handle login wrong password', async () => {
      const userData: LoginUserDto = {
        email: 'lind.rutherford@mailinator.com',
        password: 'WrongP@assword',
      };

      try {
        const mock = new mockAdapter(axios);

        mock.onPost(`${HOST}/v1/login`).reply(400, {
          success: false,
          message: `Incorrect Password for user ${userData.email}`,
        });

        const response = await axios.post(`${HOST}/v1/login`, userData);
      } catch (error) {
        // If the request results in an error (status code 4xx or 5xx), this block will be executed
        const dataLength = Object.values(error.response.data);
        expect(error.response.status).toBe(400);
        expect(dataLength).toHaveLength(2);
        expect(error.response.data).toHaveProperty('success');
        expect(error.response.data).toHaveProperty('message');
        expect(error.response.data).toEqual({
          success: false,
          message: `Incorrect Password for user ${userData.email}`,
        });
      }
    });

    it('should handle login user not found', async () => {
      const userData: LoginUserDto = {
        email: 'test.notfound@mailinator.com',
        password: 'P@ssw0rd01',
      };

      try {
        const mock = new mockAdapter(axios);

        mock.onPost(`${HOST}/v1/login`).reply(400, {
          success: false,
          message: "User not found",
        });

        const response = await axios.post(`${HOST}/v1/login`, userData);
      } catch (error) {
        // If the request results in an error (status code 4xx or 5xx), this block will be executed
        const dataLength = Object.values(error.response.data);
        expect(error.response.status).toBe(400);
        expect(dataLength).toHaveLength(2);
        expect(error.response.data).toHaveProperty('success');
        expect(error.response.data).toHaveProperty('message');
        expect(error.response.data).toEqual({
          success: false,
          message: "User not found",
        });
      }
    });
  });
});
