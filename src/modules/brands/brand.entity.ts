import { Table, Column, Model, DataType, NotEmpty, BelongsTo, BelongsToMany, ForeignKey } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../products/product.entity';

@Table
export class Brand extends Model<Brand> {
    @ApiProperty()
    @NotEmpty
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title: string;
    
    @ApiProperty()
    @Column({
        type: DataType.STRING
    })
    description: string;

    @ApiProperty()
    @Column({
        type: DataType.STRING
    })
    image: string;

   /* @ApiProperty()  
    @ForeignKey(() => Product)
    @Column
    productId: number

    @ApiProperty()
    @BelongsTo(() => Product)
    product: Product;*/
}