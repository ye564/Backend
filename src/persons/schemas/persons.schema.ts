import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Transform } from "class-transformer";
import { Document, ObjectId } from 'mongoose'

export type PersonDocument = Person & Document;

@Schema()
export class Person {
    @Transform(({ value }) => value.toString())
    _id?: ObjectId;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    lastName: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, maxlength: 2 })
    age: Number;

    @Prop({ required: true })
    email: string

    @Prop()
    activate: boolean;
}

export const PersonSchema = SchemaFactory.createForClass(Person);   