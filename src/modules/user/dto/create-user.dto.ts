import { IsOptional, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  hash: string;

  @IsNotEmpty()
  role: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  fullname?: string;

  @IsOptional()
  phoneNumber?: string;

  @IsOptional()
  dateOfBirth?: string;

  @IsOptional()
  education?: string;
}
