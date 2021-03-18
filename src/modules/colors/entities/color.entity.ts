import { ApiProperty } from "@nestjs/swagger";
import { Table, Model, NotEmpty, Column, DataType } from "sequelize-typescript";


@Table({ 
    timestamps: false
  })
export class Color extends Model<Color> {
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
        type: DataType.STRING,
        allowNull: false,
    }) 
    rgb: string;
    
}
    
