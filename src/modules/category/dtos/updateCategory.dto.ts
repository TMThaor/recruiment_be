import { IsOptional } from 'class-validator';

export class UpdateCategoryDto {
  @IsOptional()
  name?: string;
}
