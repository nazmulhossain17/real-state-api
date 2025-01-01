import { IsArray, IsNumber, IsString } from "class-validator";

export class CreateRealEstateListingDto {
    @IsString()
    name: string;
  
    @IsString()
    description: string;
  
    @IsArray()
    @IsString({ each: true })
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
    userId: string;  // The ID of the user creating the listing
  }