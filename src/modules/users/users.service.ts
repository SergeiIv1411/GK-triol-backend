import { Injectable, Inject } from '@nestjs/common';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { USER_REPOSITORY } from '../../core/constants';

@Injectable()
export class UsersService {
    async findAll(): Promise<User[]> {
        return await this.userRepository.findAll<User>();
    }

    constructor(@Inject(USER_REPOSITORY) private readonly userRepository: typeof User) { }

    async create(createUser: UserDto): Promise<User> {
        const user = new User();
        user.name = createUser.name;
        user.email = createUser.email;
        user.password = createUser.password;
        user.gender = createUser.gender;
    
        return user.save();
    }

    async findOneByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne<User>({ where: { email } });
    }

    async findOneById(id: number): Promise<User> {
        return await this.userRepository.findOne<User>({ where: { id } });
    }
}
