import { Controller, Get, Post, Body, Param, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, Query, Logger } from '@nestjs/common';
import { AuctionsService } from './auctions.service';
import { Auction } from './auction.entity';
import { CreateAuctionDto, SearchAuctionsDto } from './dto/create-auction.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { GetQuery } from 'src/auth/get-query.decorator';

@Controller('auctions')
export class AuctionsController {
	logger = new Logger('Auctions');
	constructor (private auctionsService: AuctionsService) {}
		
	@Get('/')
	@UseGuards(AuthGuard())
	getUserAuctions(@GetUser(ValidationPipe) user: User): Promise<Auction[]> {
		return this.auctionsService.getUserAuctions(user)
	}

	@Get('/search')
	searchAuctions(@GetQuery(ValidationPipe) query: any,
	): Promise<{auctions: Auction[], numberOfQueryAuctions: number, hasMore: boolean}> {
		return this.auctionsService.searchAuction(query)
	}

	@Get('/:id')
	getAuctionById(
		@Param('id', ParseIntPipe) id: number,
		@GetUser(ValidationPipe) user: User
		): Promise<Auction> {
		return this.auctionsService.getAuctionById(id, user)
	}

	@Post('/create')
	@UseGuards(AuthGuard())
	@UsePipes(ValidationPipe)
  createAuction(
		@Body() createAuctionDto: CreateAuctionDto,
		@GetUser(ValidationPipe) user: User
		): Promise<Auction> {
		return this.auctionsService.createAuction(createAuctionDto, user)
  }
}
