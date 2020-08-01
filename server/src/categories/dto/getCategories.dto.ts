import { ValidateIf } from "class-validator";

export class GetCategoriesDto {
  @ValidateIf(obj => obj.filter)
  filter: Map<string, string>
  
  @ValidateIf(obj => obj.sort)
  sort: Map<string, string>
}