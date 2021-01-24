import { IsNotEmpty } from 'class-validator'
import { Brand } from '../../brands/brand.entity';

export class CreateModelDto {
    @IsNotEmpty()
    name: string;


    brandId: number;

    @IsNotEmpty()
    categoryId: number;

    subCategoryId: number;

    brand?: Brand;

}
