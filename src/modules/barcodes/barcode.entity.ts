import { Table, Column, Model, DataType, NotEmpty, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Product } from '../products/product.entity';

@Table
export class Barcode extends Model<Barcode> {
    @ApiProperty()
    @NotEmpty
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    barcode: string;
    
    @ApiProperty()
    @Column({
        type: DataType.STRING
    })
    description: string;

   // @ApiProperty()
    @ForeignKey(() => Product)
    @Column({
        type: DataType.STRING
    })
    productId: string;

    @ApiProperty()
    @BelongsTo(() => Product)
    product: Product;
}