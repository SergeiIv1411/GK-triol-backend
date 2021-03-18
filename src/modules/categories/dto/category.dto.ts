import { ApiProperty } from "@nestjs/swagger";

export class CategoryDto {
    @ApiProperty()
    readonly name: string;
    @ApiProperty()
    readonly description: string;
    @ApiProperty()
    readonly parentId: number;
}