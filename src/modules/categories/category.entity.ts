import { Table, Column, Model, DataType, NotEmpty, BelongsToMany, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../products/product.entity';
import { CategoryProduct } from '../relations/CategoryProduct/categoryProduct.entity';

@Table
export class Category extends Model<Category> {
    @ApiProperty()
    @NotEmpty
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;
    
    @ApiProperty()
    @Column({
        type: DataType.STRING
    })
    description: string;
    
    @ApiProperty()
    @Column({
        type: DataType.INTEGER
    })
    parentId: number;
    
    @ApiProperty()
    @Column({
        type: DataType.STRING
    })
    image: string;

}


