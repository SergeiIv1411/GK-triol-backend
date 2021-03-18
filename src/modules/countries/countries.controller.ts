import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { CountryDto } from './dto/country.dto';
import { Country } from './country.entity';
import { CountriesService } from './countries.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('countries')
@Controller('countries')
export class CountriesController {

    constructor(private readonly countryService: CountriesService) { }

    @Get()
    @ApiResponse({
        status: 200,
        description: 'возвращает список стран',
        type: [Country],
      })
    async findAll(): Promise<Country[]> {
        // get all countries in the db
        return await this.countryService.findAll();
    }

    @Get(':id')
    @ApiResponse({
        status: 200,
        description: 'Находит страну по id',
        type: Country,
      })
    async findOneById(@Param('id') id: number): Promise<Country> {
        // find the country with this id
        const country = await this.countryService.findOneById(id);

        // if the country doesn't exit in the db, throw a 404 error
        if (!country) {
            throw new NotFoundException('This Country doesn\'t exist');
        }

        // if country exist, return the post
        return country;
    }

    // @UseGuards(AuthGuard('jwt'))
    @Post()
    @ApiBody({ type: CountryDto})
    @ApiResponse({
        status: 200,
        description: 'Создание страны',
        type: Country,
      })
    create(@Body() createCountryDto: CountryDto): Promise<Country> {
        // create a new country and return the newly created country
        return this.countryService.create(createCountryDto);
    }

    @Put(':id')
    @ApiResponse({
        status: 200,
        description: 'Редактирование страны',
        type: Country,
      })
  async update(@Param('id') id: number, @Body() updateUserDto: CountryDto) {
    // get the number of row affected and the updated country
    const { numberOfAffectedRows, contry } = await this.countryService.update(id, updateUserDto);

    // if the number of row affected is zero, 
    // it means the post doesn't exist in our db
    if (numberOfAffectedRows === 0) {
        throw new NotFoundException('This Country doesn\'t exist');
    }

    // return the updated post
    return contry;
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Удаление страны',
    type: Country,
  })
  async remove(@Param('id') id: number) {
    // delete the country with this id
    const deleted = await this.countryService.delete(id);

    // if the number of row affected is zero, 
    // then the country doesn't exist in our db
    if (deleted === 0) {
        throw new NotFoundException('This Country doesn\'t exist');
    }

    // return success message
    return 'Successfully deleted';
  }

    // @UseGuards(AuthGuard('jwt'))
    // @Put(':id')
    // async update(@Param('id') id: number, @Body() post: PostDto, @Request() req): Promise<PostEntity> {
    //     // get the number of row affected and the updated post
    //     const { numberOfAffectedRows, updatedPost } = await this.postService.update(id, post, req.user.id);

    //     // if the number of row affected is zero, it means the post doesn't exist in our db
    //     if (numberOfAffectedRows === 0) {
    //         throw new NotFoundException('This Post doesn\'t exist');
    //     }

    //     // return the updated post
    //     return updatedPost;
    // }

    // @UseGuards(AuthGuard('jwt'))
    // @Delete(':id')
    // async remove(@Param('id') id: number, @Request() req) {
    //     // delete the post with this id
    //     const deleted = await this.postService.delete(id, req.user.id);

    //     // if the number of row affected is zero, then the post doesn't exist in our db
    //     if (deleted === 0) {
    //         throw new NotFoundException('This Post doesn\'t exist');
    //     }

    //     // return success message
    //     return 'Successfully deleted';
    // }

}
