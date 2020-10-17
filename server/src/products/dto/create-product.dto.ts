import { IsNotEmpty } from 'class-validator'
import { Index } from 'typeorm';

export class CreateProductDto {
    @IsNotEmpty()
    @Index()
    name: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    @Index()
    brand: string;

    @IsNotEmpty()
    @Index()
    type: string;

    @IsNotEmpty()
    @Index()
    model: string;

    //@IsNotEmpty()
    userId: number = 1;
    //@IsNotEmpty()
    //categoryId: number;
}