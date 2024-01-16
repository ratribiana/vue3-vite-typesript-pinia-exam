import { Router } from 'express';
import UsersController from '@controllers/users.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@middlewares/auth.middleware';

class UsersRoute implements Routes {
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`/v1/users/list`, this.usersController.getUsers);
    this.router.get(`/v1/user/`, authMiddleware(), this.usersController.getUser);
    this.router.post(`/v1/users/register`, validationMiddleware(CreateUserDto, 'body'), this.usersController.createUser);
    this.router.put(`/v1/users/`, validationMiddleware(CreateUserDto, 'body', true), this.usersController.updateUser);
    this.router.delete(`/v1/users/`, this.usersController.deleteUser);
  }
}

export default UsersRoute;
