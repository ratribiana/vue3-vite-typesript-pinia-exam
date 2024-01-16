import { Request } from 'express';
import { User, ExternalUser } from '@interfaces/users.interface';

export interface DataStoredInToken {
  userId: string;
  email: string;
  roleId: string;
  verify?: boolean;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: User;
}

export interface LoginResult {
  cookie: string;
  token: TokenData;
}

export interface RegisterResult {
  token?: TokenData;
}

export interface ErrorResponse {
  success: boolean;
  message: string;
}

export interface SearchOTP {
  userId: string;
  otp: string;
}

export interface UserOTP {
  _id: string,
  email: string,
  firstName: 'string,
  lastName: string,
  role: string,
  isActive: number,
  isBlocked: number,
  isDeleted: number,
  latestOtp?: {
    otp: string,
    validUntil: string,
    created: string
  },
  createdAt: string,
  updatedAt: string,
  id: string
}

export interface LoginResponse {
  token: string;
  expiresIn: number;
  apiUser?: ExternalUser;
}
