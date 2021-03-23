import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';
import { User } from '../../modules/users/user.entity';
import { Brand } from '../../modules/brands/brand.entity';
import { Color } from '../../modules/colors/color.entity';
import { Category } from '../../modules/categories/category.entity';
import { Country } from '../../modules/countries/country.entity';
import { Barcode } from '../../modules/barcodes/barcode.entity';
import { Product } from '../../modules/products/product.entity';
import { CategoryProduct} from '../../modules/relations/CategoryProduct/categoryProduct.entity'


export const databaseProviders = [{
    provide: SEQUELIZE,
    useFactory: async () => {
        let config;
        switch (process.env.NODE_ENV) {
            case DEVELOPMENT:
                config = databaseConfig.development;
                break;
            case TEST:
                config = databaseConfig.test;
                break;
            case PRODUCTION:
                config = databaseConfig.production;
                break;
            default:
                config = databaseConfig.development;
        }
        const sequelize = new Sequelize(config);
        sequelize.addModels([User, Brand, Color, Category, Country, Barcode, Product, CategoryProduct]);
        await sequelize.sync();
        return sequelize;
    },
}];