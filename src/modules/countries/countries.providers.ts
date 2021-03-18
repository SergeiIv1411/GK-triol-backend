import { Country } from './country.entity';
import { COUNTRY_REPOSITORY } from '../../core/constants';

export const countriesProviders = [{
    provide: COUNTRY_REPOSITORY,
    useValue: Country,
}];