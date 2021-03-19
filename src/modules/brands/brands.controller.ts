import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { BrandDto } from './dto/brand.dto';
import { Brand } from './brand.entity';
import { BrandsService } from './brands.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from 'src/utils/file-upload.utils';
import { FILE_BRAND_DIR } from 'src/core/constants';
import path = require('path');
import { v4 as uuidv4 } from 'uuid';
import { diskStorage } from 'multer';

export const storage = {
    storage: diskStorage({
        destination: FILE_BRAND_DIR,
        filename: (req, file, cb) => {
            const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
            const extension: string = path.parse(file.originalname).ext;

            cb(null, `${filename}${extension}`)
        },
    }), fileFilter: imageFileFilter

}

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
        // find the brand with this id
        const brand = await this.brandService.findOneById(id);

        // if the brand doesn't exit in the db, throw a 404 error
        if (!brand) {
            throw new NotFoundException('This Brand doesn\'t exist');
        }

        // if brand exist, return the brand
        return brand;
    }

    // @UseGuards(AuthGuard('jwt'))
    @Post()
    @ApiBody({ type: BrandDto })
    @ApiResponse({
        status: 200,
        description: 'Создание брэнда',
        type: Brand,
    })
    create(@Body() createBrandDto: BrandDto): Promise<Brand> {
        // create a new brand and return the newly created brand
        return this.brandService.create(createBrandDto);
    }

    @Put(':id')
    @ApiResponse({
        status: 200,
        description: 'Редактирование брэнда',
        type: Brand,
    })
    async update(@Param('id') id: number, @Body() updateBrandDto: BrandDto) {
        // get the number of row affected and the updated brand
        const { numberOfAffectedRows, brand } = await this.brandService.update(id, updateBrandDto);

        // if the number of row affected is zero, 
        // it means the brand doesn't exist in our db
        if (numberOfAffectedRows === 0) {
            throw new NotFoundException('This Brand doesn\'t exist');
        }

        // return the updated brand
        return brand;
    }

    @Delete(':id')
    @ApiResponse({
        status: 200,
        description: 'Удаление брэнда',
        type: Brand,
    })
    async remove(@Param('id') id: number) {
        // delete the brand with this id
        const deleted = await this.brandService.delete(id);

        // if the number of row affected is zero, 
        // then the brand doesn't exist in our db
        if (deleted === 0) {
            throw new NotFoundException('This Brand doesn\'t exist');
        }

        // return success message
        return 'Successfully deleted';
    }

    @Put('uploadimage/:brandid')
    @UseInterceptors(
        FileInterceptor('image', storage),
    )
    async uploadImage(@Param('brandid') brandId, @UploadedFile() file): Promise<Brand> {
        const { numberOfAffectedRows, brand } = await this.brandService.setImage(Number(brandId), file.filename);

        if (numberOfAffectedRows === 0) {
            throw new NotFoundException('This Brand doesn\'t exist');
        }

        // return the updated brand
        return brand;
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
