import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Table, Model, NotEmpty, Column, DataType, ForeignKey, BelongsToMany, HasMany } from "sequelize-typescript";
import {  DoubleDataType, IntegerDataType } from "sequelize/types";
import { Barcode } from "../barcodes/barcode.entity";
import { Brand } from "../brands/brand.entity";
import { Category } from "../categories/category.entity";
import { Country } from "../countries/country.entity";
import { CategoryProduct } from "../relations/CategoryProduct/categoryProduct.entity";


@Table
export class Product extends Model<Product> {
    @ApiProperty()
    @NotEmpty
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
    })
    artikul: string;

    @ApiProperty()
    @NotEmpty
    @Column({
        type: DataType.UUID,
        allowNull: false,
        unique: true,
        
    }) 
    uuid: string;////// ??????

    @ApiProperty()
    @NotEmpty
    @Column({
        type: DataType.STRING,
        allowNull: false,
    }) 
    name: string;

    @ApiProperty()
    @NotEmpty
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    }) 
    new_product: boolean;

    @ApiProperty()
    @NotEmpty
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    }) 
    sales: boolean;
  
    @ApiProperty()
    @NotEmpty
    @Column({
        type: DataType.DOUBLE(11, 3),
        allowNull: false,
    }) 
    weight: DoubleDataType;

    @ApiProperty()
    @NotEmpty
    @Column({
        type: DataType.STRING,
        allowNull: false,
    }) 
    composition: string;

    @ApiProperty()
    @NotEmpty
    @Column({
        type: DataType.STRING,
        allowNull: false,
    }) 
    description: string;

    @ApiProperty()
    @ForeignKey(() => Brand)
    brand_name: Brand;

    @ApiProperty()
    @NotEmpty
    @Column({
        type: DataType.DOUBLE(15,2),
        allowNull: false,
    }) 
    price: DoubleDataType;   
  
    @ApiProperty()
    @ForeignKey(() => Country)
    country_name: Country;
 
    @ApiProperty()
    @NotEmpty
    @Column({
        type: DataType.STRING,
        allowNull: false,
    }) 
    sizes: string;
   
    @ApiProperty()
    @NotEmpty
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    }) 
    count_in_package: IntegerDataType;

    @ApiProperty()
    @NotEmpty
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    }) 
    balance: IntegerDataType;

    @ApiProperty()
    @BelongsToMany(() => Category, () => CategoryProduct)
    categories: Category[];

    @ApiPropertyOptional()
    @HasMany(() => Barcode)
    barcodes: Barcode[];

}
