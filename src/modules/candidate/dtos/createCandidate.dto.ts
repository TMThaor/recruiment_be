import { IsNotEmpty } from 'class-validator';

export class CreateCandidateDto {
  @IsNotEmpty()
  account_id: string;
  @IsNotEmpty()
  fullname: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  phoneNumber: string;
  @IsNotEmpty()
  dateOfBirth: string;
  @IsNotEmpty()
  education: string;
}
