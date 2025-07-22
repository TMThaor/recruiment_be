import { IsNotEmpty } from 'class-validator';

export class CreateStaffDto {
  @IsNotEmpty()
  fullName: string;
  @IsNotEmpty()
  position: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  status: string;
}
