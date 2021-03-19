import { Table, Column, Model, DataType, NotEmpty } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

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