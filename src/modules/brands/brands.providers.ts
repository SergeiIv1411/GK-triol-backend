import { Brand } from './brand.entity';
import { BRAND_REPOSITORY } from '../../core/constants';

export const brandsProviders = [{
    provide: BRAND_REPOSITORY,
    useValue: Brand,
}];