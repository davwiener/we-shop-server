import { IsNotEmpty, ValidateIf, IsArray } from 'class-validator'
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { PriceLevels } from '../auction.entity';



export class CreateAuctionDto {
    priceLevels: [];
    endDate: string;
    name: string;
    category: string
    subCategory: string
    product: number
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
