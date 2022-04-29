import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { personDTO } from './dto/person.dto';
import { PersonUpdate } from './dto/personUpdate.dro';
import { PersonRepository } from './persons.repository';
import { Person } from './schemas/persons.schema';

@Injectable()
export class PersonsService {

    constructor(private personRepository: PersonRepository) { }

    async getAll(option): Promise<Person[]> {
        return await this.personRepository.find(option);
    }

    async createPerson(person: personDTO): Promise<Person> {
        const { password } = person;
        const planetPassword = await hash(password, 10);

        return await this.personRepository.create({
            name: person.name,
            lastName: person.lastName,
            password: planetPassword,
            email: person.email,
            age: person.age,
            activate: person.activate,
        })
    }

    async getOne(options): Promise<Person> {
        const person = await this.personRepository.finOne(options)
        if (person) return person;
        throw new HttpException('no', HttpStatus.NOT_FOUND);
    }

    async update(_id: string, persondDto: PersonUpdate): Promise<Person> {
        return await this.personRepository.update({ _id }, persondDto)
    }
}
