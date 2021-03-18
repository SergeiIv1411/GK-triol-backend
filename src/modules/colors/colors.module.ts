import { Module } from '@nestjs/common';
import { ColorsService } from './colors.service';
import { colorsProviders } from './colors.providers';
import { ColorsController } from './colors.controller';

@Module({
  providers: [ColorsService, ...colorsProviders],
  controllers: [ColorsController],
  exports: [ColorsService]
})
export class ColorsModule {}
