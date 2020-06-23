import { IsNotEmpty } from 'class-validator'

export class CreateAuctionDto {
    @IsNotEmpty()
    price_levels: object;
    
    @IsNotEmpty()
    end_date: string
}