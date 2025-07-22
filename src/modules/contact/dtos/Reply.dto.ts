import { IsOptional } from 'class-validator';

export class ReplyDto {
  @IsOptional()
  fullName?: string;
  @IsOptional()
  email?: string;
  @IsOptional()
  message?: string;
  @IsOptional()
  repliedBy?: string;
  @IsOptional()
  answer?: string;
}
