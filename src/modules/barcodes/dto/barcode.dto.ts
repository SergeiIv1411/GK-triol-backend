import { ApiProperty } from "@nestjs/swagger";

export class BarcodeDto {
    @ApiProperty()
    readonly barcode: string;
    @ApiProperty()
    readonly description: string;
}