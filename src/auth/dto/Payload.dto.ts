import { Transform } from "class-transformer";
import { ObjectId } from 'mongoose'
export class PayloadDTO {
    @Transform(({ value }) => value.toString())
    _id?: ObjectId;
    id: string;
    name: string
}