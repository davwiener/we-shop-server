import { Controller, Get, Post, Body, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuctionsService } from './auctions.service';
import { Auction } from './auction.model';
import { CreateAuctionDto } from './dto/create-auction.dto';

@Controller('auctions')
export class AuctionsController {
    constructor (private auctionsService: AuctionsService) {}

    @Get()
    getAllAuctions(): Auction[] {
        return this.auctionsService.getAllAuctions()
		}
		
		@Get('/:id')
		getAuctionById(@Param('id') id: string): Auction {
			return this.auctionsService.getAuctionById(id)
		}

		@Post()
		@UsePipes(ValidationPipe)
    createAuction(@Body() createAuctionDto: CreateAuctionDto): Auction {
				return this.auctionsService.createAuction(createAuctionDto)
    }
}
