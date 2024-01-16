import { IsBoolean, IsEmail, IsNotEmpty, IsMongoId, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public password: string;

  @IsOptional()
  @IsObject()
  public role?: string;

  @IsOptional()
  @IsString()
  public firstName?: string;

  @IsOptional()
  @IsString()
  public lastName?: string;

  @IsOptional()
  @IsBoolean()
  public isActive?: number;

  @IsOptional()
  @IsObject()
  public latestOtp?: object;
}

export class LoginUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}
