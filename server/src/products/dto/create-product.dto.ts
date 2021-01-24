import { IsNotEmpty } from 'class-validator'
import { Index } from 'typeorm';
export type Item = { name: string, id: number, selectedItem?: string };
export class CreateProductDto {
    @IsNotEmpty()
    productName: string;

    description: string;

    brand: Item;

    model: Item;

    category: Item;

    @IsNotEmpty()
    subCategory: Item;
}
