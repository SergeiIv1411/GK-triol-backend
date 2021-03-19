import { Injectable, Inject } from '@nestjs/common';
import { Barcode } from './barcode.entity';
import { BarcodeDto } from './dto/barcode.dto';
import { BARCODE_REPOSITORY } from '../../core/constants';

@Injectable()
export class BarcodesService {
    constructor(@Inject(BARCODE_REPOSITORY) private readonly barcodeRepository: typeof Barcode) { }
    
    async findAll(): Promise<Barcode[]> {
        return await this.barcodeRepository.findAll<Barcode>();
    }

    async create(createBarcode: BarcodeDto): Promise<Barcode> {
        const barcode = new Barcode();
        barcode.barcode = createBarcode.barcode;
        barcode.description = createBarcode.description;
    
        return barcode.save();
    }

    async findOneById(id: number): Promise<Barcode> {
        return await this.barcodeRepository.findOne<Barcode>({ where: { id } });
    }

    async update(id: number, updateBarcodeDto: BarcodeDto) {
        const [numberOfAffectedRows, [barcode]] = await this.barcodeRepository.update({ ...updateBarcodeDto }, { where: { id }, returning: true });

        return { numberOfAffectedRows, barcode };
    }

    async delete(id: number) {
        return await this.barcodeRepository.destroy({ where: { id } });
    }
}
