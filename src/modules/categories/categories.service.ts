import { Injectable, Inject } from '@nestjs/common';
import { Category } from './category.entity';
import { CategoryDto } from './dto/category.dto';
import { CATEGORY_REPOSITORY } from '../../core/constants';

@Injectable()
export class CategoriesService {
    constructor(@Inject(CATEGORY_REPOSITORY) private readonly categoryRepository: typeof Category) { }
    
    async findAll(): Promise<Category[]> {
        return await this.categoryRepository.findAll<Category>();
    }

    async create(createCategory: CategoryDto): Promise<Category> {
        const category = new Category();
        category.name = createCategory.name;
        category.description = createCategory.description;
        category.parentId = createCategory.parentId;

        return category.save();
    }

    async findOneById(id: number): Promise<Category> {
        return await this.categoryRepository.findOne<Category>({ where: { id } });
    }

    async findCategoriesByParentId(parentId: number): Promise<Category[]> {
        return await this.categoryRepository.findAll<Category>({
            where: {
              parentId: parentId
            }
          });
    }
}
