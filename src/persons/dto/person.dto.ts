import { IsBoolean, IsEmail, IsNumber, IsString } from "class-validator";

export class personDTO {
    @IsString()
    name: string;

    @IsString()
    lastName: string;

    @IsString()
    password: string;

    @IsNumber()
    age: number;

    @IsEmail()
    email: string;

    @IsBoolean()
    activate: boolean
}