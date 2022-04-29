import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Transform } from "class-transformer";
import { Document, ObjectId } from "mongoose"

export type CountryDocument = Country & Document;

@Schema()
export class Country {
    @Transform(({ value }) => value.toString())
    _id?: ObjectId;

    @Prop()
    country: string;

    @Prop()
    town: string;

    @Prop()
    adress: string;
}

export const CountrySchema = SchemaFactory.createForClass(Country);