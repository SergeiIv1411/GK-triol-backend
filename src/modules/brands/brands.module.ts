import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { brandsProviders } from './brands.providers';
import { BrandsController } from './brands.controller';

@Module({
    providers: [BrandsService, ...brandsProviders],
    controllers: [BrandsController],
    exports: [BrandsService],
})
export class BrandsModule {}