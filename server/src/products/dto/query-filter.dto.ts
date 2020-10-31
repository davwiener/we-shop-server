import { FindOperator } from "typeorm";

export class QueryFilterDto {
    type?: FindOperator<string>;
    brand?: FindOperator<string>;
    model?: FindOperator<string>;
    select?: string[];
}