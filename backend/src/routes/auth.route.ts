import { Router } from 'express';
import AuthController from '@/controllers/auth.controller';
import { CreateUserDto, LoginUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';

class AuthRoute implements Routes {
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`/v1/register`, validationMiddleware(CreateUserDto, 'body'), this.authController.register);
    this.router.post(`/v1/verify`, authMiddleware(), this.authController.verifyUser);
    this.router.get(`/v1/request-otp`, authMiddleware(), this.authController.requestOTP);
    this.router.post(`/v1/login`, validationMiddleware(LoginUserDto, 'body'), this.authController.logIn);
  }
}

export default AuthRoute;
