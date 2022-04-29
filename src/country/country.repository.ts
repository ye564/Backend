import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Country, CountryDocument } from "./schemas/country.schema";
import { Model, FilterQuery } from 'mongoose'
import { DocumentType } from "@typegoose/typegoose";

@Injectable()
export class CountryRepository {
    constructor(@InjectModel(Country.name) private countryModel: Model<CountryDocument>) { }

    async find(contryFilteQuery: FilterQuery<DocumentType<Country>>): Promise<Country[]> {
        return await this.countryModel.find(contryFilteQuery);
    }

    async create(coutry: Country): Promise<Country> {
        const newCountry = new this.countryModel(coutry)
        return await newCountry.save();
    }

    async findOne(countryFilterQuery: FilterQuery<DocumentType<Country>>): Promise<Country> {
        return await this.countryModel.findOne(countryFilterQuery)

    }

    async update(countryFilterQuery: FilterQuery<DocumentType<Country>>,
        country: Partial<Country>) {
        return await this.countryModel.findOneAndUpdate(
            countryFilterQuery,
            country,
            { new: true }
        )
    }
}