import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { categoriesProviders } from './categories.providers';
import { CategoriesController } from './categories.controller';

@Module({
    providers: [CategoriesService, ...categoriesProviders],
    controllers: [CategoriesController],
    exports: [CategoriesService],
})
export class CategoriesModule {}