import { IsOptional } from 'class-validator';

export class UpdateJobDto {
  @IsOptional()
  category_id?: string;
  @IsOptional()
  title?: string;
  @IsOptional()
  description?: string;
  @IsOptional()
  requirements?: string;
  @IsOptional()
  benefits?: string;
  @IsOptional()
  quantity?: number;
  @IsOptional()
  location?: string;
  @IsOptional()
  experienceRequired?: number;
  @IsOptional()
  jobType?: string;
  @IsOptional()
  skills?: string;
  @IsOptional()
  minSalary?: number;
  @IsOptional()
  maxSalary?: number;
  @IsOptional()
  level?: string;
  @IsOptional()
  expire_at?: string;
}
