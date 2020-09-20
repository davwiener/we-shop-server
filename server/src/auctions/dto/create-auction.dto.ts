import { IsNotEmpty, ValidateIf } from 'class-validator'
import { CreateProductDto } from 'src/products/dto/create-product.dto';

export class CreateAuctionDto {
    @IsNotEmpty()
    price_levels: string;
    
    @IsNotEmpty()
    end_date: string;

    name: string;
    description: string;
    productId: number;
    
    product: CreateProductDto
}

export class SearchAuctionsDto {  
    @IsNotEmpty()
    page: number;
}
