import { ApiProperty } from "@nestjs/swagger";

export class CreateColorDto {   
    @ApiProperty()
    readonly name: string;
    @ApiProperty()
    readonly rgb: string;
}
