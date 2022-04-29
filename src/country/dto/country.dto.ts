import { IsNumberString, IsString } from "class-validator";

export class CountryDTO {
    @IsString()
    country: string;

    @IsString()
    town: string;

    @IsString()
    adress: string;
}