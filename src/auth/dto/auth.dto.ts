import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class AuthDto{
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()  // role optional
    role?: string;

    @IsString()
    @IsNotEmpty()  // Make street a required field
    street: string;

    @IsString()
    @IsNotEmpty()  // Make city a required field
    city: string;

    @IsString()
    @IsNotEmpty()  // Make state a required field
    state: string;

    @IsString()
    @IsNotEmpty()  // Make zip a required field
    zip: string;
}