import { Barcode } from './barcode.entity';
import { BARCODE_REPOSITORY } from '../../core/constants';

export const barcodesProviders = [{
    provide: BARCODE_REPOSITORY,
    useValue: Barcode,
}];