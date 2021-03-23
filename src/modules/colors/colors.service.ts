import { Inject, Injectable } from '@nestjs/common';
import { Color } from './color.entity';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { COLOR_REPOSITORY } from '../../core/constants';


@Injectable()
export class ColorsService {
  constructor(@Inject(COLOR_REPOSITORY) private readonly colorRepository: typeof Color){}

    async create(createColor: CreateColorDto): Promise<Color> {
      const color = new Color();
      color.name = createColor.name;
      color.rgb = createColor.rgb;

      return color.save();
    }
  
    async findAll(): Promise<Color[]> {
      return await this.colorRepository.findAll<Color>();
    }
  
    async findOneById(id: number):Promise<Color> {
      return await this.colorRepository.findOne<Color>({ where: { id } });
    }
  
  /*  update(id: number, updateColorDto: UpdateColorDto) {
      return `This action updates a #${id} color`;
    }
  
    remove(id: number) {
      return `This action removes a #${id} color`;
    }*/
  }


