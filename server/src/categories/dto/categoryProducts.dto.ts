import { IsNotEmpty, IsNumberString } from 'class-validator'

export class GetCategoryProductsDto {
    @IsNotEmpty()
    @IsNumberString()
    category: string;
}