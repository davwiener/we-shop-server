import { ValidateIf } from 'class-validator'

export class GetModelsDto {
  filter: string;

  @ValidateIf(obj => obj.sort)
  sort: Map<string, string>

  categoryId: number;
  subCategoryId: number;
  brandId: number;
  page: number;
  rbp: number;
  searchWord: string

}
