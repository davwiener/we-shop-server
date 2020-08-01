import { Injectable, NotFoundException } from '@nestjs/common';
import { Auction } from './auction.entity';
import { AuctionStatus } from './auction-status.enum';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Not } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { Product } from 'src/products/product.entity';

@Injectable()
export class AuctionsService {
	constructor(
			@InjectRepository(Auction)
			private auctionRepository: Repository<Auction>,
			@InjectRepository(Product)
			private productRepository: Repository<Product>
	) {}

	getAuctions = async (categories: string): Promise<Auction[]> => {
		const activeStatus = { status: Not(In([AuctionStatus.PENDING, AuctionStatus.ENDED])) }
		const queryObject = {}
		if (categories) {
			queryObject['categoryId'] = In(categories.split(','))
		}
		if (Object.keys(queryObject).length) {
			const productIds = await (await this.productRepository.find({ where: queryObject })).map(product => product.id)
			return await this.auctionRepository.find({ where: { productId: In(productIds), ...activeStatus }})
		}
		else {
			return await this.auctionRepository.find({ where: activeStatus })
		}
	}

	getAuctionById = async (id: number, user: User): Promise<Auction> => {
			const found = await this.auctionRepository.findOne({ where: { id, userId: user.id }})
			if (!found) {
					throw new NotFoundException()
			}
			return found
	}

	getUserAuctions = async (user: User): Promise<Auction[]> => {
		return await this.auctionRepository.find({ userId: user.id })
	}

	createAuction = async (createAuctionDto: CreateAuctionDto, user: User): Promise<Auction> => {
		const { end_date, price_levels, name, description, productId } = createAuctionDto
		const auction = await this.auctionRepository.save({
			end_date,
			price_levels,
			name,
			description,
			user,
			status: AuctionStatus.PENDING,
			productId
		})
		delete(auction.user)
		return auction
	}
}
