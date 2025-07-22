import { IsOptional } from 'class-validator';

export class OfferDto {
  @IsOptional()
  salary?: string;
  @IsOptional()
  startDate?: string;
  @IsOptional()
  workLocation?: string;
}
