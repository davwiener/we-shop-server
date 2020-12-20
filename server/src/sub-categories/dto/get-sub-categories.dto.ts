import { IsNotEmpty, IsNumber, IsNumberString, IsString } from 'class-validator'

export class GetSubCategoriesDto {
    @IsNumberString()
    categoryId: string;
    @IsString()
    searchWord: string;
    @IsNumber()
    rbp: number;
    @IsNumber()
    page: number;
}