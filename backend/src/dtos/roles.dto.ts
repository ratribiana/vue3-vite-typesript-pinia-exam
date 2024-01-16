import { IsEmail, IsNumber, IsString, IsObject } from 'class-validator';

export class CreateUserDto {
  @IsString()
  public name: string;

  @IsString()
  public label: string;

  @IsNumber()
  public isDeleted: number;

  @IsObject()
  public permissions: object;
}
