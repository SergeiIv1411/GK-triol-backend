import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { BarcodeDto } from './dto/barcode.dto';
import { Barcode } from './barcode.entity';
import { BarcodesService } from './barcodes.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('barcodes')
@Controller('barcodes')
export class BarcodesController {

    constructor(private readonly barcodeService: BarcodesService) { }

    @Get()
    @ApiResponse({
        status: 200,
        description: 'возвращает список штрихкодов',
        type: [Barcode],
      })
    async findAll(): Promise<Barcode[]> {
        // get all barcodes in the db
        return await this.barcodeService.findAll();
    }

    @Get(':id')
    @ApiResponse({
        status: 200,
        description: 'Находит штрихкод по id',
        type: Barcode,
      })
    async findOneById(@Param('id') id: number): Promise<Barcode> {
        // find the barcode with this id
        const barcode = await this.barcodeService.findOneById(id);

        // if the barcode doesn't exit in the db, throw a 404 error
        if (!barcode) {
            throw new NotFoundException('This Barcode doesn\'t exist');
        }

        // if user exist, return the post
        return barcode;
    }

    // @UseGuards(AuthGuard('jwt'))
    @Post()
    @ApiBody({ type: BarcodeDto})
    @ApiResponse({
        status: 200,
        description: 'Создание штрихкода',
        type: Barcode,
      })
    create(@Body() createBarcodeDto: BarcodeDto): Promise<Barcode> {
        // create a new barcode and return the newly created barcode
        return this.barcodeService.create(createBarcodeDto);
    }

    @Put(':id')
    @ApiResponse({
        status: 200,
        description: 'Редактирование штрихкода',
        type: Barcode,
      })
  async update(@Param('id') id: number, @Body() updateBarcodeDto: BarcodeDto) {
    // get the number of row affected and the updated barcode
    const { numberOfAffectedRows, barcode } = await this.barcodeService.update(id, updateBarcodeDto);

    // if the number of row affected is zero, 
    // it means the barcode doesn't exist in our db
    if (numberOfAffectedRows === 0) {
        throw new NotFoundException('This Barcode doesn\'t exist');
    }

    // return the updated post
    return barcode;
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Удаление штрихкода',
    type: Barcode,
  })
  async remove(@Param('id') id: number) {
    // delete the barcode with this id
    const deleted = await this.barcodeService.delete(id);

    // if the number of row affected is zero, 
    // then the barcode doesn't exist in our db
    if (deleted === 0) {
        throw new NotFoundException('This Barcode doesn\'t exist');
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
