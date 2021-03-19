import { Module } from '@nestjs/common';
import { BarcodesService } from './barcodes.service';
import { barcodesProviders } from './barcodes.providers';
import { BarcodesController } from './barcodes.controller';

@Module({
    providers: [BarcodesService, ...barcodesProviders],
    controllers: [BarcodesController],
    exports: [BarcodesService],
})
export class BarcodesModule {}