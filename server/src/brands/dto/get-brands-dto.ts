import { ValidateIf } from 'class-validator'

export class GetBrandsDto {
  filter: string;

  @ValidateIf(obj => obj.sort)
  sort: Map<string, string>

  categoryId: number;
  subCategoryId: number;

  page: number;
  rbp: number;
  searchWord: string

}
