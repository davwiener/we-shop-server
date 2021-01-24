import { IsNotEmpty } from 'class-validator'

export class CreateBrandDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    categoryId: number;

    subCategoryId: number;

}
