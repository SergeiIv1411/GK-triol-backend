import { ApiProperty } from "@nestjs/swagger";

export class CountryDto {
    @ApiProperty()
    readonly name: string;
    @ApiProperty()
    readonly description: string;
}