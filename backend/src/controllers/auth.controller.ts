import axios, { AxiosInstance } from 'axios';
import { CreateUserDto, LoginUserDto } from '@dtos/users.dto';

import { AsyncHandler } from '@interfaces/asyncHandler.interface';
import { Role } from '@interfaces/roles.interface';
import { ExternalUser } from '@interfaces/users.interface';
import { LoginResponse } from '@interfaces/auth.interface';

import AuthService from '@services/auth.service';
import roleModel from '@models/roles.model';

import { asyncHandler, generateRandom } from '@utils/functions';
import { HttpException } from '@exceptions/HttpException';
import { logger } from '@utils/logger';
import moment from '@utils/moment';
import { sendMail } from '@utils/mailer';
import { NODE_ENV, EXTERNAL_API_BASE_URL, EXTERNAL_API_USERNAME, EXTERNAL_API_PASSWORD } from '@config';

class AuthController {
  public authService = new AuthService();

  public register: AsyncHandler = asyncHandler(async (req, res, next) => {
    try {
      const { body } = req;
      const { email, password, firstName, lastName } = body;

      const role: Role | null = await roleModel.findOne({ name: 'users' });

      const otp: string = generateRandom('0', 6);

      const userData: CreateUserDto = {
        email,
        password,
        role: role._id,
        firstName,
        lastName,
        isActive: 0,
        latestOtp: {
          otp,
          validUntil: moment(new Date()).add(15, 'minutes').valueOf()
        }
      };

      const registerResult = await this.authService.register(userData);

      // Send OTP for verification
      await sendMail('welcome', email, {
        firstName,
        otp
      })

      res.status(201).json({ data: registerResult, message: 'User successfully registered' });
    } catch (error) {
      logger.error(`[ERROR]: ${req.method} ${req.originalUrl}`, error);

      res.status(400).json({
        success: false,
        message: error.message || 'An error occured.',
      });
    }
  });

  public verifyUser: AsyncHandler = asyncHandler(async (req, res, next) => {
    try {
      const userId: string = req.user.id;
      const { otp } = req.body;

      const isNotValidOTP: boolean = await this.authService.verifyOTP({
        userId,
        otp
      });

      if (isNotValidOTP) {
        return res.status(400).json({ success: false, message: 'OTP is invalid or expired. Please Request Another OTP', error: 'invalid_otp' });
      }

      await this.authService.updateUser(userId, { isActive: 1, latestOtp: {} });

      res.status(200).json({ success: true, message: 'Account successfully verified' });
    } catch (error) {
      // Handle other errors
      logger.error(`[ERROR]: ${req.method} ${req.originalUrl}`, error);

      if (error instanceof HttpException && error.status === 400) {
        // Handle the case where userData is empty
        res.status(400).json({
          success: false,
          message: 'Invalid request. User data is empty.',
        });
      }

      res.status(400).json({
        success: false,
        message: error.message || 'An error occurred.',
      });
    }
  });

  public requestOTP: AsyncHandler = asyncHandler(async (req, res) => {
    try {
      const userId: string = req.user.id;
      const otp: string = generateRandom('0', 6);

      const latestOtp = {
        otp,
        validUntil: moment().add(15, 'minutes').valueOf()
      }

      const user = await this.authService.updateUser(userId, { latestOtp });
      const { email, firstName } = user

      // Send OTP for verification
      await sendMail('welcome', email, {
        firstName,
        otp
      })

      res.status(200).json({ success: true, message: 'OTP successfully generated' });
    } catch (error) {
      // Handle other errors
      logger.error(`[ERROR]: ${req.method} ${req.originalUrl}`, error);

      if (error instanceof HttpException && error.status === 400) {
        res.status(400).json({
          success: false,
          message: 'There is an error. Generating new OTP',
        });
      }

      res.status(400).json({
        success: false,
        message: error.message || 'There is an error. Generating new OTP',
      });
    }
  });

  public logIn: AsyncHandler = asyncHandler(async (req, res) => {
    try {
      const userData: LoginUserDto = req.body;

      const authResult = await this.authService.login(userData);

      if (!authResult) {
        // Handle the case where authService.login returns null
        return res.status(400).json({
          success: false,
          message: 'Invalid request. User data is empty',
        });
      }

      const { cookie, token } = authResult;

      let tokenData: LoginResponse = { ...token };

      if (NODE_ENV != 'test') {
        const externalAPIOptions: object = {
          baseURL: EXTERNAL_API_BASE_URL,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        };

        const externalAPI: AxiosInstance = axios.create(externalAPIOptions);

        const { data } = await externalAPI.post<ExternalUser>('/auth/login', {
          username: EXTERNAL_API_USERNAME,
          password: EXTERNAL_API_PASSWORD,
        });

        tokenData.apiUser = data
      }

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: tokenData, message: 'User successfully login' });
    } catch (error) {
      // Handle other errors
      logger.error(`[ERROR]: ${req.method} ${req.originalUrl}`, error);

      if (error instanceof HttpException && error.status === 400) {
        // Handle the case where userData is empty
        res.status(400).json({
          success: false,
          message: 'Invalid request. User data is empty.',
        });
      }

      res.status(400).json({
        success: false,
        message: error.message || 'An error occurred.',
      });
    }
  });
}

export default AuthController;
