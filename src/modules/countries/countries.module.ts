import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { countriesProviders } from './countries.providers';
import { CountriesController } from './countries.controller';

@Module({
    providers: [CountriesService, ...countriesProviders],
    controllers: [CountriesController],
    exports: [CountriesService],
})
export class CountriesModule {}