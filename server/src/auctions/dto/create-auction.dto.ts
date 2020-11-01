import { IsNotEmpty, ValidateIf } from 'class-validator'
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { PriceLevels } from '../auction.entity';



export class CreateAuctionDto {
    @IsNotEmpty()
    price_levels: PriceLevels;
    @IsNotEmpty()
    end_date: any;

    name: string;
    description: string;
    productId: number;
    
    product: CreateProductDto
}

export class SearchAuctionsDto {  
    @IsNotEmpty()
    page: number;
    @IsNotEmpty()
    rbp: number;
    name: string;
    model: string
    minPrice: number;
    maxPrice: number;
    endDate: number;
    description: string;
    productId: number;
    productIds: number[];
    type: string;
    brand: string;
    sortBy: string;
}
