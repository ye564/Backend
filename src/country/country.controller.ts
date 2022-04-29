import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/jwt-auth.guard';
import { CountryService } from './country.service';
import { CountryDTO } from './dto/country.dto';
import { countryUpdateDTO } from './dto/countryUpdatae.dto';
import { Country } from './schemas/country.schema';

@Controller('country')
export class CountryController {
    constructor(private readonly countryService: CountryService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getCountry(): Promise<Country[]> {
        try {
            return this.countryService.getAll()
        } catch (e) { console.log(e) }
    }

    @Post('new')
    @UseGuards(JwtAuthGuard)
    createCountry(@Body() countryDTO: CountryDTO): Promise<Country> {
        return this.countryService.createCountry(
            countryDTO.country,
            countryDTO.town,
            countryDTO.adress
        )
    }

    @UseGuards(JwtAuthGuard)
    @Get(':_id')
    async oneCountry(@Param('_id') id: string): Promise<Country> {
        return await this.countryService.getOnes(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put('edit/:_id')
    async editar(@Param('_id') _id: string, @Body() countryEdit: countryUpdateDTO): Promise<Country> {
        return this.countryService.Put(_id, countryEdit)
    }
}
