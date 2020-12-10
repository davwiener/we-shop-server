import { ValidateIf } from 'class-validator'

export class GetProductsDto {
  filter: string;

  @ValidateIf(obj => obj.sort)
  sort: Map<string, string>

  category: number;
  sub_category: number;
}
