import { IsNotEmpty } from 'class-validator'

export class CreateProductDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    company_name: string;

    @IsNotEmpty()
    type: string;

    @IsNotEmpty()
    model: string;

    //@IsNotEmpty()
    userId: number = 1234;
    //@IsNotEmpty()
    //categoryId: number;
    
    
    
}