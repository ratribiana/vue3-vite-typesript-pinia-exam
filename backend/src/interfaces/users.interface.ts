export interface User {
  _id: string;
  id?: string;
  email: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  isActive?: number;
  isBlocked?: number;
  isDeleted?: number;
  latestOtp?: {
    otp: string;
    validUntil: string;
    created: string;
  };
  verify?: boolean;
}

export interface ExternalUser {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}
