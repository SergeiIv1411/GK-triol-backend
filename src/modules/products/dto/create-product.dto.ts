import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateProductDto {
      
        @ApiProperty()
        readonly artikul: string;

        @ApiProperty()
        readonly uuid: string;////// ??????
    
        @ApiProperty()
        readonly name: string;
    
        @ApiProperty()
        readonly new_product: boolean;
    
        @ApiProperty()
        readonly sales: boolean;
      
        @ApiProperty()
        readonly weight: number;  /// ????
    
        @ApiProperty()
        readonly  composition: string;
    
        @ApiProperty()
        readonly description: string;
       
        @ApiPropertyOptional()
        readonly brand_id: number;
    
        @ApiPropertyOptional()
        readonly brand_name: string;
    
        @ApiProperty()
        readonly price: number; //???  
        
        @ApiPropertyOptional()
        readonly country_id: number;
    
        @ApiPropertyOptional()
        readonly country_name: string;
    
        @ApiProperty()
        readonly sizes: string;
       
        @ApiProperty()
        readonly count_in_package: number; //// ????
    
        @ApiProperty()
        readonly balance: number; ////  ????
    
}
