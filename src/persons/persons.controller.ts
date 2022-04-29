import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/jwt-auth.guard';
import { personDTO } from './dto/person.dto';
import { PersonUpdate } from './dto/personUpdate.dro';
import { PersonsService } from './persons.service';
import { Person } from './schemas/persons.schema';

@Controller('persons')
export class PersonsController {

    constructor(private readonly servicePerson: PersonsService) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async getPersonas(@Request() request: any): Promise<Person[]> {
        return await this.servicePerson.getAll(request);
    };

    @Post('new')
    async newPerson(@Body() personDTO: personDTO): Promise<Person> {
        return await this.servicePerson.createPerson(personDTO);
    }

    @Get(':_id')
    @UseGuards(JwtAuthGuard)
    async personOne(@Param('_id') personId: string): Promise<Person> {
        return await this.servicePerson.getOne(personId)
    }

    @Put('update/:_id')
    @UseGuards(JwtAuthGuard)
    async editPerson(@Param('_id') personId: string, @Body() personDTO: PersonUpdate): Promise<Person> {
        return await this.servicePerson.update(personId, personDTO);
    }
}
