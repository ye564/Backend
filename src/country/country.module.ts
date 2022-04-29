import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Country, CountrySchema } from './schemas/country.schema';
import { CountryRepository } from './country.repository';
import { JwtAuthGuard } from 'src/common/jwt-auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Country.name, schema: CountrySchema }
    ])
  ],
  providers: [CountryService, CountryRepository, JwtAuthGuard],
  controllers: [CountryController],
  exports: [CountryService, CountryRepository]
})
export class CountryModule { }
