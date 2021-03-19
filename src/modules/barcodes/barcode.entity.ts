import { Table, Column, Model, DataType, NotEmpty } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

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
}