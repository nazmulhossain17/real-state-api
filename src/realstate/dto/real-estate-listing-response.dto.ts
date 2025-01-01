import { IsString, IsNumber, IsArray } from 'class-validator';

export class RealEstateListingResponseDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsArray()
  images: string[];

  @IsString()
  location: string;

  @IsNumber()
  price: number;

  @IsNumber()
  bedrooms: number;

  @IsNumber()
  bathrooms: number;

  @IsNumber()
  area: number;

  @IsString()
  userId: string;  // The ID of the user who created the listing

  @IsString()
  createdAt: string;

  @IsString()
  updatedAt: string;
}
