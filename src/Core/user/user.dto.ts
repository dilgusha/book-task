import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class RegisterDto {
    @IsNotEmpty()
    @Length(3, 50)
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Length(6, 50)
    password: string;
}

export class LoginDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Length(6, 50)
    password: string;
}