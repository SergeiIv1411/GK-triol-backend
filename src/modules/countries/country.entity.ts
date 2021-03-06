import { Table, Column, Model, DataType, NotEmpty } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@Table({ 
    timestamps: false
  })
export class Country extends Model<Country> {
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
}