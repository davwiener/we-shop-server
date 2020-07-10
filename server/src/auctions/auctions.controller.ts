import { Controller, Get, Post, Body, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuctionsService } from './auctions.service';
import { Auction } from './auction.entity';
import { CreateAuctionDto } from './dto/create-auction.dto';

@Controller('auctions')
export class AuctionsController {
	constructor (private auctionsService: AuctionsService) {}

	@Get()
	getAllAuctions(): Promise<Auction[]> {
		console.log('got a request');
		return this.auctionsService.getAllAuctions()
	}
		
	@Get('/:id')
	getAuctionById(@Param('id') id: string): Promise<Auction> {
		return this.auctionsService.getAuctionById(id)
	}

	@Post()
	// @UsePipes(ValidationPipe)
  createAuction(@Body() createAuctionDto: CreateAuctionDto) {
		this.auctionsService.createAuction(createAuctionDto)
  }
}
