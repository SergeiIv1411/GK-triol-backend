import { Injectable, Inject } from '@nestjs/common';
import { Country } from './country.entity';
import { CountryDto } from './dto/country.dto';
import { COUNTRY_REPOSITORY } from '../../core/constants';

@Injectable()
export class CountriesService {
    constructor(@Inject(COUNTRY_REPOSITORY) private readonly countryRepository: typeof Country) { }
    
    async findAll(): Promise<Country[]> {
        return await this.countryRepository.findAll<Country>();
    }

    async create(createCountry: CountryDto): Promise<Country> {
        const country = new Country();
        country.name = createCountry.name;
        country.description = createCountry.description;
    
        return country.save();
    }

    async findOneById(id: number): Promise<Country> {
        return await this.countryRepository.findOne<Country>({ where: { id } });
    }

    async update(id: number, updateCountryDto: CountryDto) {
        const [numberOfAffectedRows, [contry]] = await this.countryRepository.update({ ...updateCountryDto }, { where: { id }, returning: true });

        return { numberOfAffectedRows, contry };
    }

    async delete(id: number) {
        return await this.countryRepository.destroy({ where: { id } });
    }
}
