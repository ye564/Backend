import { Module } from '@nestjs/common';
import * as Joi from '@hapi/joi'

import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonsModule } from './persons/persons.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CountryModule } from './country/country.module';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [PersonsModule,
    ConfigModule.forRoot({
      envFilePath: ['environments/.env.development.local'],
      validationSchema: Joi.object({
        PORT: Joi.number(),
        DB: Joi.string().required(),
      })
    }),
    MongooseModule.forRoot(process.env.DB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }),
    CountryModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
