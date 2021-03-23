import { Color } from './color.entity';
import { COLOR_REPOSITORY } from '../../core/constants';

export const colorsProviders = [{
    provide: COLOR_REPOSITORY,
    useValue: Color,
}];