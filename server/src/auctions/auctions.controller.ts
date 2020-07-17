import { Controller, Get, Post, Body, Param, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuctionsService } from './auctions.service';
import { Auction } from './auction.entity';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('auctions')
@UseGuards(AuthGuard())
export class AuctionsController {
	constructor (private auctionsService: AuctionsService) {}

	@Get()
	getAllAuctions(@GetUser() user: User): Promise<Auction[]> {
		return this.auctionsService.getAllAuctions(user)
	}
		
	@Get('/:id')
	getAuctionById(
		@Param('id', ParseIntPipe) id: number,
		@GetUser() user: User
		): Promise<Auction> {
		return this.auctionsService.getAuctionById(id, user)
	}

	@Post()
	@UsePipes(ValidationPipe)
  createAuction(
		@Body() createAuctionDto: CreateAuctionDto,
		@GetUser() user: User
		): Promise<Auction> {
		return this.auctionsService.createAuction(createAuctionDto, user)
  }
}
