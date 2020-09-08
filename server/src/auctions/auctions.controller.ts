import { Controller, Get, Post, Body, Param, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, Query } from '@nestjs/common';
import { AuctionsService } from './auctions.service';
import { Auction } from './auction.entity';
import { CreateAuctionDto, SearchAuctionsDto } from './dto/create-auction.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { GetProductsDto } from 'src/products/get-products.dto';
import { GetQuery } from 'src/auth/get-query.decorator';

@Controller('api/auctions')
export class AuctionsController {
	constructor (private auctionsService: AuctionsService) {}

	@Get('/aaa')
	getAllAuctions(@GetUser(ValidationPipe) user: User): Promise<Auction[]> {
		return this.auctionsService.getAllAuctions(user)
	}

	@Post('/search')
	searchAuctions(@Body(ValidationPipe)query: SearchAuctionsDto ,
	): Promise<Auction[]> {
			//console.log('asdsad' + query);
		return this.auctionsService.searchAuction(query)
	}


		
	@Get('/:id')
	getAuctionById(
		@Param('id', ParseIntPipe) id: number,
		@GetUser(ValidationPipe) user: User
		): Promise<Auction> {
		return this.auctionsService.getAuctionById(id, user)
	}

	@Post()
	@UsePipes(ValidationPipe)
  createAuction(
		@Body() createAuctionDto: CreateAuctionDto,
		@GetUser(ValidationPipe) user: User
		): Promise<Auction> {
		return this.auctionsService.createAuction(createAuctionDto, user)
  }
}
