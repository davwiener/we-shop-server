import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { SearchAuctionsDto } from "src/auctions/dto/create-auction.dto";

export const GetQuery = createParamDecorator((data, ctx: ExecutionContext): SearchAuctionsDto => {
    const req = ctx.switchToHttp().getRequest();
    console.log('req' + req);
    console.log('query' + req.query);
    return req.query;
  })