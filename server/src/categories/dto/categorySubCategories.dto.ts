import { IsNotEmpty, IsNumberString } from 'class-validator'

export class GetCategorySubCategoriesDto {
    @IsNotEmpty()
    @IsNumberString()
    category: string;
}