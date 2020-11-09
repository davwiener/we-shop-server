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
    brandId: string;

    @IsNotEmpty()
    @Index()
    modelId: string;
}