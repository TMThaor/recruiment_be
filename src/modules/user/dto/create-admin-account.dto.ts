import { IsOptional, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateAdminAccountDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  hash: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  fullname: string;
}
