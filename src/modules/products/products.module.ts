import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { productsProviders } from './products.providers';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ...productsProviders],
  exports: [ProductsService]
})
export class ProductsModule {}
