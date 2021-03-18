import { ApiProperty } from "@nestjs/swagger";

export class BrandDto {
    @ApiProperty()
    readonly title: string;
    @ApiProperty()
    readonly description: string;
}