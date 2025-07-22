import { Account } from '@prisma/client';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'username không được để trống' })
  @IsEmail()
  username: string;
  @IsNotEmpty({ message: 'password không được để trống' })
  password: string;
}

export interface AuthResponseDto {
  access_token: string;
}

export type RemovedPasswordUser = Omit<Account, 'hash'>;
