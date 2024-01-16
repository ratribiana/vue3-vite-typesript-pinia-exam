import { SECRET_KEY } from '@config';
import { CreateUserDto, LoginUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData, LoginResult, SearchOTP, UserOTP } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import userModel from '@/models/users.model';
import { isEmpty, comparePassword } from '@utils/functions';
import { encoder } from '@utils/jwt';
import moment from '@utils/moment';

const encode = encoder({
  secret: SECRET_KEY,
  expireInSeconds: 60 * 60 * 24, //24 hours
});

class AuthService {
  public users = userModel;

  public async register(userData: CreateUserDto): Promise<TokenData> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = await this.users.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `This email '${userData.email}' already exists`);

    let createUserData: User = await this.users.create({ ...userData });

    createUserData.verify = true;

    const tokenData = this.createToken(createUserData);

    return tokenData;
  }

  public async login(userData: LoginUserDto): Promise<LoginResult> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = await this.users.findOne({ email: userData.email }).select('email password role isBlocked isDeleted isActive');
    if (!findUser) throw new HttpException(409, `User not found`);
    if (findUser.isBlocked === 1) throw new HttpException(409, `User is Blocked. Please contact admin`);
    if (findUser.isDeleted === 1) throw new HttpException(409, `User is Deleted. Please contact admin`);
    if (findUser.isActive === 0) throw new HttpException(409, `User is Inactive. Please contact admin`);

    const isPasswordMatching: boolean = await comparePassword(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, `Incorrect Password for user ${userData.email}`);

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    const result: LoginResult = { cookie, token: tokenData };

    return result;
  }

  public async logout(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = await this.users.findOne({ email: userData.email, password: userData.password });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    return findUser;
  }

  public createToken(user: User): TokenData {
    const { id, email, role, verify } = user;

    const dataStoredInToken: DataStoredInToken = { userId: id, email, roleId: role, verify };
    const expiresIn = moment(new Date()).add(24, 'hours').valueOf();

    return { expiresIn, token: encode(dataStoredInToken) };
  }

  public createCookie(token: TokenData): string {
    return `Authorization=${token.token}; HttpOnly; Max-Age=${token.expiresIn};`;
  }

  public verifyOTP = async (search: SearchOTP): Promise<boolean> => {
    const userOTP: User = await this.users.findById(search.userId).select('+latestOtp');

    console.log(userOTP);

    if (userOTP && !userOTP.latestOtp.otp) throw new HttpException(401, `OTP is already verified. Please request another OTP`);
    if (userOTP && userOTP.latestOtp.otp != search.otp) throw new HttpException(401, `OTP not matched. Please request another OTP`);

    return userOTP.latestOtp.otp == search.otp ? moment(userOTP.latestOtp.validUntil).valueOf() <= moment().valueOf() : false;
  }

  public updateUser = async (userId: string, data: object): Promise<any> => {
    const updateQuery: Record<string, any> = { $set: data }; // Treat data as $set by default

    if ('$unset' in data) {
      updateQuery.$unset = data['$unset'];
    }

    if ('$pull' in data) {
      updateQuery.$pull = data['$pull'];
    }

    const updatedUser = await this.users.findByIdAndUpdate(userId, updateQuery, { new: true });

    return updatedUser;
  };
}

export default AuthService;
