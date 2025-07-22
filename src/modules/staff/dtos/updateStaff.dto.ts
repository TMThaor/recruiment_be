import { IsOptional } from 'class-validator';

export class UpdateStaffDto {
  @IsOptional()
  fullName?: string;
  @IsOptional()
  position?: string;
  @IsOptional()
  email?: string;
  @IsOptional()
  status?: string;
}
