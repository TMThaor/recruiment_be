import { IsNotEmpty } from 'class-validator';

export class ContactDto {
  @IsNotEmpty()
  fullName: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  message: string;
}
