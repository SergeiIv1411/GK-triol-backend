import { ApiProperty } from "@nestjs/swagger"
import { Column, ForeignKey, Model, Table } from "sequelize-typescript"
import { Category } from "src/modules/categories/category.entity"
import { Product } from "src/modules/products/product.entity"


@Table(({ 
    timestamps: false
  })) 
export class CategoryProduct extends Model<CategoryProduct> {
    @ApiProperty()
    @ForeignKey(() => Category)
    @Column
    categoryId: number

    @ApiProperty()
    @ForeignKey(() => Product)
    @Column
    productId: number    
}