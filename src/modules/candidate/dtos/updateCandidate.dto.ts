import { IsOptional } from 'class-validator';

export class UpdateCandidateDto {
  @IsOptional()
  account_id?: string;
  @IsOptional()
  fullname?: string;
  @IsOptional()
  email?: string;
  @IsOptional()
  phoneNumber?: string;
  @IsOptional()
  dateOfBirth?: string;
  @IsOptional()
  education?: string;
}
