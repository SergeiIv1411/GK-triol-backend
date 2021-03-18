import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ColorsService } from './colors.service';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { Color } from './entities/color.entity';

@ApiTags('colors')
@Controller('colors')
export class ColorsController {
  constructor(private readonly colorsService: ColorsService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Возвращает список цветов',
    type: [Color]
  })
  async findAll(): Promise<Color[]> {
    // get all colors in db
    return await this.colorsService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status:200,
    description: 'Находит цвет по id',
    type: Color,
  })
  async findOneById(@Param('id') id: number):Promise<Color> {
    // find color by Id
    const color = await this.colorsService.findOneById(id);

    if (!color) {
      throw new NotFoundException('No color with id: '+ id);
    }
    return color;
  }

  @Post()
  create(@Body() createColorDto: CreateColorDto): Promise<Color> {
    // create a new color and return the newly created color
    return this.colorsService.create(createColorDto);
  }
  /*@Patch(':id')
  update(@Param('id') id: string, @Body() updateColorDto: UpdateColorDto) {
    return this.colorsService.update(+id, updateColorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.colorsService.remove(+id);
  }*/
}
