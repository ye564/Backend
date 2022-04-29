import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { jwtStrategy } from 'src/common/jwt.strategy';
import { PersonsController } from './persons.controller';
import { PersonRepository } from './persons.repository';
import { PersonsService } from './persons.service';
import { Person, PersonSchema } from './schemas/persons.schema';

@Module({
    imports: [MongooseModule.forFeature([
        { name: Person.name, schema: PersonSchema },
    ]),],
    controllers: [PersonsController],
    providers: [PersonsService, PersonRepository, jwtStrategy],
    exports: [PersonsService, PersonRepository]
})
export class PersonsModule { }
