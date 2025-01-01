import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateRealEstateListingDto {
    @IsString()
    @IsOptional()
    name?: string;
  
    @IsString()
    @IsOptional()
    description?: string;
  
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    images?: string[];
  
    @IsString()
    @IsOptional()
    location?: string;
  
    @IsNumber()
    @IsOptional()
    price?: number;
  
    @IsNumber()
    @IsOptional()
    bedrooms?: number;
  
    @IsNumber()
    @IsOptional()
    bathrooms?: number;
  
    @IsNumber()
    @IsOptional()
    area?: number;
  }