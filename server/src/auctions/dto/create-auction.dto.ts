import { IsNotEmpty, ValidateIf } from 'class-validator'

export class CreateAuctionDto {
    @IsNotEmpty()
    price_levels: string;
    
    @IsNotEmpty()
    end_date: string;

    name: string;
    description: string;
}

export class SearchAuctionsDto {  
    @IsNotEmpty()
    page: number;
}

