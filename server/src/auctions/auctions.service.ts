import { Injectable, NotFoundException } from '@nestjs/common';
import { Auction } from './auction.entity';
import { AuctionStatus } from './auction-status.enum';
import { CreateAuctionDto, SearchAuctionsDto } from './dto/create-auction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Not } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { async } from 'rxjs/internal/scheduler/async';
import { Product } from 'src/products/product.entity';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class AuctionsService {
	constructor(
			@InjectRepository(Auction)
			private auctionRepository: Repository<Auction>,
			@InjectRepository(Product)
			private productRepository: Repository<Product>,
			private productsService: ProductsService 
	) {}
	
	getAllAuctions = async (user: User): Promise<Auction[]> => {
		return await this.auctionRepository.find({ id: user.id })
	}

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
		const { end_date, price_levels, name, description, productId, product } = createAuctionDto
		let auction
		if (productId) {
			auction = await this.auctionRepository.save({
				end_date,
				price_levels,
				name,
				description,
				user,
				status: AuctionStatus.PENDING,
				productId, 
				created_at: new Date(),
				userId: 1
			})
			delete(auction.user)
		}
		else if(product) {
			const createdProduct = await this.productsService.createProduct(product);
			  if (createdProduct) {
				auction = await this.auctionRepository.save({
					end_date,
					price_levels,
					name,
					description,
					user,
					status: AuctionStatus.PENDING,
					productId: createdProduct.id,
					created_at: new Date(),
					userId: 1
				})
				delete(auction.user)
			  }
		} else {
			console.log(product);
			console.log('error');
		}
		return auction
	}
	addProducts = async (auctions: Auction[]): Promise<Auction[]> => {
		auctions.map(async auction => {
			const product = await this.productRepository.find({ id: auction.productId});
			if (auction) {
				auction.product = product[0];
			}
			console.log(product);
			console.log(auction);
		})
		return auctions;
	}
	searchAuction = async (createAuctionDto: SearchAuctionsDto): Promise<Auction | any> => {
		let auctions = await this.auctionRepository.find();
		await Promise.all(auctions.map(async auction => {
			const product = await this.productRepository.find({ id: auction.productId});
			if (auction) {
				auction.product = product[0];
			}
			console.log(product);
			console.log(auction);
		}))
		console.log('ret');
		return auctions;
		
	}

}
