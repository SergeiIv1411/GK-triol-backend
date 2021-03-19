import { Injectable, Inject } from '@nestjs/common';
import { Brand } from './brand.entity';
import { BrandDto } from './dto/brand.dto';
import { BRAND_REPOSITORY } from '../../core/constants';

@Injectable()
export class BrandsService {
    constructor(@Inject(BRAND_REPOSITORY) private readonly brandRepository: typeof Brand) { }
    
    async findAll(): Promise<Brand[]> {
        return await this.brandRepository.findAll<Brand>();
    }

    async create(createBrand: BrandDto): Promise<Brand> {
        const brand = new Brand();
        brand.title = createBrand.title;
        brand.description = createBrand.description;
    
        return brand.save();
    }

    async findOneById(id: number): Promise<Brand> {
        return await this.brandRepository.findOne<Brand>({ where: { id } });
    }

    async update(id: number, updateBrandDto: BrandDto) {
        const [numberOfAffectedRows, [brand]] = await this.brandRepository.update({ ...updateBrandDto }, { where: { id }, returning: true });

        return { numberOfAffectedRows, brand };
    }

    async delete(id: number) {
        return await this.brandRepository.destroy({ where: { id } });
    }

    async setImage(id: number, image: string): Promise<any> {
        const [numberOfAffectedRows, [brand]] = await this.brandRepository.update({ image }, { where: { id }, returning: true });

        return { numberOfAffectedRows, brand };
    }
}
