import { Injectable, NotFoundException } from '@nestjs/common';
import { Auction } from './auction.entity';
import { AuctionStatus } from './auction-status.enum';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuctionsService {
	constructor(
			@InjectRepository(Auction)
			private auctionRepository: Repository<Auction>,
	) {}

	getAllAuctions = (): Promise<Auction[]> => {
			return this.auctionRepository.find()
	}

	getAuctionById = (id: number): Promise<Auction> => {
			const found = this.auctionRepository.findOne(id)
			if (!found) {
					throw new NotFoundException()
			}
			return found
	}

	createAuction = async (createAuctionDto: CreateAuctionDto): Promise<Auction> => {
		const { end_date, price_levels, name, description } = createAuctionDto
		return await this.auctionRepository.save({
			end_date,
			price_levels,
			name,
			description
		})		
	}
}
