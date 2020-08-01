import { ValidateIf } from "class-validator";

export class QueryFilterDto {
  categories: string
  sort: string
  product: string
}