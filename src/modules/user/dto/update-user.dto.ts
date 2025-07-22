import { IsOptional, IsEmail } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  fullname?: string;

  @IsOptional()
  phoneNumber?: string;

  @IsOptional()
  role?: string;

  @IsOptional()
  dateOfBirth?: string;

  @IsOptional()
  education?: string;
}
