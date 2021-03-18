import { Table, Column, Model, DataType, NotEmpty } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

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
}