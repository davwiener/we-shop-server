import { IsNotEmpty } from 'class-validator'

export class CreateProductDto {
    @IsNotEmpty()
    name: string;
    
    description: string;

    @IsNotEmpty()
    categoryId: number
}