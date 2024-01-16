export interface IUser {
  id?: string;
  firstName: string | null;
  lastName: string | null;
  fullName?: string | null;
  email: string;
  isActive?: number;
  isBlocked: number;
  isDeleted?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface IUserExternalAPI {
  id?: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}
