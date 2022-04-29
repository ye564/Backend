import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CountryRepository } from './country.repository';
import { countryUpdateDTO } from './dto/countryUpdatae.dto';
import { Country } from './schemas/country.schema';

@Injectable()
export class CountryService {
    constructor(private readonly countryRespository: CountryRepository) { }

    async getAll(): Promise<Country[]> {
        return await this.countryRespository.find({})
    }

    async createCountry(
        country,
        town,
        adress
    ): Promise<Country> {
        return this.countryRespository.create({
            country,
            town,
            adress
        })
    }

    async getOnes(_id: string): Promise<Country> {
        const country = await this.countryRespository.findOne({ _id, });
        console.log(country)
        if (country) return country;
        throw new HttpException(
            'el ide no existe',
            HttpStatus.NOT_FOUND
        );
    };

    async Put(id: string, countryUpdate: countryUpdateDTO): Promise<Country> {
        return await this.countryRespository.update({ _id: id, }, countryUpdate);
    }

}
