import { ValidateIf, IsObject } from 'class-validator'
import { Transform } from 'class-transformer'

export class GetProductsDto {

  // @ValidateIf(obj => obj.filter)
  // @IsObject()
  filter: string;

  @ValidateIf(obj => obj.sort)
  sort: Map<string, string>
}
