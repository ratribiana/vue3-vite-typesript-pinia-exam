import type { IUser } from 'types/user.types';
import { ACCESS_TOKEN_KEY, FULL_NAME, REGISTER_ACCESS_TOKEN_KEY, USER_EMAIL } from 'utils/constants';

interface IAuthState {
  userInfo: IUser;
  isLoading: boolean;
  accessToken: string | null;
}

export default (): IAuthState => ({
  userInfo: {
    email: localStorage.getItem(USER_EMAIL) || '',
    fullName: localStorage.getItem(FULL_NAME) || '',
  } as IUser,
  isLoading: false,
  accessToken: localStorage.getItem(ACCESS_TOKEN_KEY) || '',
  registerToken: localStorage.getItem(REGISTER_ACCESS_TOKEN_KEY) || '',
});
