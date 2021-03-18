import { Category } from './category.entity';
import { CATEGORY_REPOSITORY } from '../../core/constants';

export const categoriesProviders = [{
    provide: CATEGORY_REPOSITORY,
    useValue: Category,
}];