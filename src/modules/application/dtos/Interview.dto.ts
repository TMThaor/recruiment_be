import { IsOptional } from 'class-validator';

export class InterviewDto {
  @IsOptional()
  date?: string;
  @IsOptional()
  time?: string;
  @IsOptional()
  type?: string;
  @IsOptional()
  location?: string;
  @IsOptional()
  interviewer?: string;
}
