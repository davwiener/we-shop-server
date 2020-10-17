import { Controller, Get, Post, Body, Param, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, Query, Logger } from '@nestjs/common';
import { AuctionsService } from './auctions.service';
import { Auction } from './auction.entity';
import { CreateAuctionDto, SearchAuctionsDto } from './dto/create-auction.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('auctions')
export class AuctionsController {
	logger = new Logger('Auctions');
	constructor (private auctionsService: AuctionsService) {}
		
	@Get('/my_auctions')
	@UseGuards(AuthGuard())
	getUserAuctions(@GetUser(ValidationPipe) user: User): Promise<Auction[]> {
		return this.auctionsService.getUserAuctions(user)
	}

	@Get('/getAllAuctions')
	getAllAuctions(@GetUser(ValidationPipe) user: User): Promise<Auction[]> {
		return this.auctionsService.getAllAuctions(user)
	}

	@Get('/search')
	searchAuctions(@GetQuery(ValidationPipe) query: any,
	): Promise<Auction[]> {
		this.logger.log('search')
		return this.auctionsService.searchAuction(query)
	}

	@Get('/:id')
	getAuctionById(
		@Param('id', ParseIntPipe) id: number,
		@GetUser(ValidationPipe) user: User
		): Promise<Auction> {
		return this.auctionsService.getAuctionById(id, user)
	}

	@Post('/createAuction')
	@UseGuards(AuthGuard())
	@UsePipes(ValidationPipe)
  createAuction(
		@Body() createAuctionDto: CreateAuctionDto,
		@GetUser(ValidationPipe) user: User
		): Promise<Auction> {
		return this.auctionsService.createAuction(createAuctionDto, user)
  }
}
