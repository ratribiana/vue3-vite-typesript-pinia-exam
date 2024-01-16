export interface IAuth {
  email: string;
  password: string;
}

export interface IRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IVerify {
  otp: string;
}

export interface IRegisterResult {
  expiresIn: number;
  token: string;
}

export interface IUserInfo {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  status: string;
}
