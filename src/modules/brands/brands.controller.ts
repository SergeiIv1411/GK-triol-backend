import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { BrandDto } from './dto/brand.dto';
import { Brand } from './brand.entity';
import { BrandsService } from './brands.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('brands')
@Controller('brands')
export class BrandsController {

    constructor(private readonly brandService: BrandsService) { }

    @Get()
    @ApiResponse({
        status: 200,
        description: 'возвращает список брэндов',
        type: [Brand],
      })
    async findAll(): Promise<Brand[]> {
        // get all brands in the db
        return await this.brandService.findAll();
    }

    @Get(':id')
    @ApiResponse({
        status: 200,
        description: 'Находит брэнд по id',
        type: Brand,
      })
    async findOneById(@Param('id') id: number): Promise<Brand> {
        // find the user with this id
        const brand = await this.brandService.findOneById(id);

        // if the user doesn't exit in the db, throw a 404 error
        if (!brand) {
            throw new NotFoundException('This Brand doesn\'t exist');
        }

        // if user exist, return the post
        return brand;
    }

    // @UseGuards(AuthGuard('jwt'))
    @Post()
    @ApiBody({ type: BrandDto})
    @ApiResponse({
        status: 200,
        description: 'Создание брэнда',
        type: Brand,
      })
    create(@Body() createBrandDto: BrandDto): Promise<Brand> {
        // create a new post and return the newly created post
        return this.brandService.create(createBrandDto);
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
