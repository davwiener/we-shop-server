import { IsNotEmpty } from 'class-validator'

export class CreateAuctionDto {
    @IsNotEmpty()
    price_levels: string;
    
    @IsNotEmpty()
    end_date: string;

    name: string;
    description: string;

    @IsNotEmpty()
    productId: number
}