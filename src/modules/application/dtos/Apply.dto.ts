import { IsNotEmpty, IsOptional } from 'class-validator';

export class ApplyDto {
  @IsOptional()
  candidate_id?: string;
  @IsNotEmpty()
  job_id: string;
  @IsOptional()
  cv?: string;
  @IsNotEmpty()
  status: string;
  @IsNotEmpty()
  dateOfBirth: string;
  @IsNotEmpty()
  education: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  fullname: string;
  @IsNotEmpty()
  phoneNumber: string;
}
