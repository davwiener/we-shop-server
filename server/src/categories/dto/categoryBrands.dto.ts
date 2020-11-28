import { IsNotEmpty, IsNumberString } from 'class-validator'

export class GetCategoryBrandsDto {
    @IsNotEmpty()
    @IsNumberString()
    category: string;
}