import { IsOptional } from 'class-validator';

export class UpdateAppliedDto {
  @IsOptional()
  candidate_id?: string;
  @IsOptional()
  cv?: string;
  @IsOptional()
  status?: string;
  @IsOptional()
  dateOfBirth?: string;
  @IsOptional()
  education?: string;
  @IsOptional()
  email?: string;
  @IsOptional()
  fullname?: string;
  @IsOptional()
  phoneNumber?: string;
}
