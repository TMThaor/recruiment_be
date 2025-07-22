import { IsOptional } from 'class-validator';

export class UpdateContactDto {
  @IsOptional()
  fullName?: string;
  @IsOptional()
  email?: string;
  @IsOptional()
  message?: string;
}
