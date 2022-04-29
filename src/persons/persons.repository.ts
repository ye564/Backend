import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Person, PersonDocument } from "./schemas/persons.schema";
import { Model, FilterQuery } from 'mongoose'
import { DocumentType } from '@typegoose/typegoose'

@Injectable()
export class PersonRepository {
    constructor(@InjectModel(Person.name)
    private personModel: Model<PersonDocument>) { }

    async find(personFilterQuery: FilterQuery<DocumentType<Person>>): Promise<Person[]> {
        return await this.personModel.find(personFilterQuery);
    }

    async create(person: Person): Promise<Person> {
        const newPerson = new this.personModel(person);
        return await newPerson.save();
    }

    async finOne(
        personFilterQuery: FilterQuery<DocumentType<Person>>
    ): Promise<Person> {
        return await this.personModel.findOne(personFilterQuery)
    }
    async update(
        personFilterQuery: FilterQuery<DocumentType<Person>>,
        person: Partial<Person>
    ): Promise<Person> {
        return await this.personModel.findOneAndUpdate(personFilterQuery, person)
    }

}