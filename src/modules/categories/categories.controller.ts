import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { CategoryDto } from './dto/category.dto';
import { Category } from './category.entity';
import { CategoriesService } from './categories.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {

  constructor(private readonly categoryService: CategoriesService) { }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'возвращает список категорий',
    type: [Category],
  })
  async findAll(): Promise<Category[]> {
    // get all categories in the db
    return await this.categoryService.findAll();
  }

  @Get(': id')
  @ApiResponse({
    status: 200,
    description: 'Находит категорию по id',
    type: Category,
  })
  async findOneById(@Param('id') id: number): Promise<Category> {
    // find the category with this id
    const category = await this.categoryService.findOneById(id);

    // if the category doesn't exit in the db, throw a 404 error
    if (!category) {
      throw new NotFoundException('This Category doesn\'t exist');
    }

    // if category exist, return the post
    return category;
  }

  // @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiBody({ type: CategoryDto })
  @ApiResponse({
    status: 200,
    description: 'Создание категории',
    type: Category,
  })
  create(@Body() createCategoryDto: CategoryDto): Promise<Category> {
    // create a new category and return the newly created post
    return this.categoryService.create(createCategoryDto);
  }

  @Get('getByParentId/:parentId')
  @ApiResponse({
    status: 200,
    description: 'возвращает список категорий по id родительской категории',
    type: [Category],
  })
  async findCategoriesByParentId(@Param('parentId') parentId: number): Promise<Category[]> {
    // get all categories by parentId in the db
    return await this.categoryService.findCategoriesByParentId(parentId);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'Редактирование категории',
    type: Category,
  })
  async update(@Param('id') id: number, @Body() updateCategoryDto: CategoryDto) {
    // get the number of row affected and the updated category
    const { numberOfAffectedRows, category } = await this.categoryService.update(id, updateCategoryDto);

    // if the number of row affected is zero, 
    // it means the category doesn't exist in our db
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException('This Category doesn\'t exist');
    }

    // return the updated category
    return category;
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Удаление категории',
    type: Category,
  })
  async remove(@Param('id') id: number) {
    // delete the category with this id
    const deleted = await this.categoryService.delete(id);

    // if the number of row affected is zero, 
    // then the category doesn't exist in our db
    if (deleted === 0) {
      throw new NotFoundException('This Category doesn\'t exist');
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
