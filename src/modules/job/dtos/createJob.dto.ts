import { IsOptional, IsNotEmpty } from 'class-validator';

export class CreateJobDto {
  @IsNotEmpty()
  category_id: string;
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  requirements: string;
  @IsNotEmpty()
  benefits: string;
  @IsNotEmpty()
  quantity: number;
  @IsNotEmpty()
  location: string;
  @IsNotEmpty()
  experienceRequired: number;
  @IsNotEmpty()
  jobType: string;
  @IsNotEmpty()
  skills: string;
  @IsOptional()
  minSalary?: number;
  @IsOptional()
  maxSalary?: number;
  @IsNotEmpty()
  level: string;
  @IsOptional()
  expire_at?: string;
}
