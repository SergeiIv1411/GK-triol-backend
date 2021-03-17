import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) { }

    @Get()
    @ApiResponse({
        status: 200,
        description: 'возвращает список пользователей',
        type: [User],
      })
    async findAll(): Promise<User[]> {
        // get all users in the db
        return await this.userService.findAll();
    }

    @Get(':id')
    @ApiResponse({
        status: 200,
        description: 'Находит пользователя по id',
        type: User,
      })
    async findOneById(@Param('id') id: number): Promise<User> {
        // find the user with this id
        const user = await this.userService.findOneById(id);

        // if the user doesn't exit in the db, throw a 404 error
        if (!user) {
            throw new NotFoundException('This User doesn\'t exist');
        }

        // if user exist, return the post
        return user;
    }

    @Get(':email')
    async findOneByEmail(@Param('email') email: string): Promise<User> {
        // find the user with this email
        const user = await this.userService.findOneByEmail(email);

        // if the user doesn't exit in the db, throw a 404 error
        if (!user) {
            throw new NotFoundException('This User doesn\'t exist');
        }

        // if user exist, return the post
        return user;
    }

    // @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@Body() createUserDto: UserDto): Promise<User> {
        // create a new post and return the newly created post
        return this.userService.create(createUserDto);
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
