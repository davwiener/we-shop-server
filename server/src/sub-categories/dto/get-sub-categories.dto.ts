import { IsNotEmpty, IsNumber, IsNumberString, IsString } from 'class-validator'

export class GetSubCategoriesDto {
    @IsNumberString()
    categoryId: number;
    @IsString()
    searchWord: string;
    @IsNumber()
    rbp: number;
    @IsNumber()
    page: number;
}