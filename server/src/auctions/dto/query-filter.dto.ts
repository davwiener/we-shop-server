import { FindOperator } from "typeorm";

export class QueryFilterDto {
  take: number;
  skip?: number;
  price_levels?: FindOperator<any>;
  name?: FindOperator<any>;
  date?: FindOperator<any>;
  productId?: FindOperator<any>;
  end_date?: FindOperator<any>;
  model?: FindOperator<any>;
  order?: Record<string, string>
}