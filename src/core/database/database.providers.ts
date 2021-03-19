import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';
import { User } from '../../modules/users/user.entity';
import { Brand } from '../../modules/brands/brand.entity';
import { Color } from '../../modules/colors/entities/color.entity';
import { Category } from '../../modules/categories/category.entity';
import { Country } from 'src/modules/countries/country.entity';
import { Barcode } from 'src/modules/barcodes/barcode.entity';

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
        sequelize.addModels([User, Brand, Color, Category, Country, Barcode]);
        await sequelize.sync();
        return sequelize;
    },
}];