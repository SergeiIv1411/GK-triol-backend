import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { BrandsModule } from './modules/brands/brands.module';
import { ColorsModule } from './modules/colors/colors.module';
import { UsersModule } from './modules/users/users.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { CountriesModule } from './modules/countries/countries.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    BrandsModule,
    ColorsModule,
    CategoriesModule,
    CountriesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
