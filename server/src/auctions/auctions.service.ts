import { Injectable, NotFoundException } from '@nestjs/common';
import { Auction } from './auction.entity';
import { AuctionStatus } from './auction-status.enum';
import { CreateAuctionDto, SearchAuctionsDto } from './dto/create-auction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Not, LessThan, FindOperator, Like, Equal, LessThanOrEqual, Between, OrderByCondition } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { async } from 'rxjs/internal/scheduler/async';
import { Product } from 'src/products/product.entity';
import { ProductsService } from 'src/products/products.service';
import { QueryFilterDto } from './dto/query-filter.dto';

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
		const { end_date, price_levels, name, description, productId, product } = createAuctionDto;
		let auction
		if (productId) {
			auction = await this.auctionRepository.save({
				end_date: Date.parse(end_date) / 3600,
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
	/**
	 * create a query for search in data base.
	 * @param searchAuctionDto - the received request.
	 */
	private createQuery = (searchAuctionDto: SearchAuctionsDto): QueryFilterDto =>  {
		const req: QueryFilterDto = {
			take: searchAuctionDto.rbp, order:  {
			price_levels: 'ASC'
		}};
		if (searchAuctionDto.sortBy) {
			const obj = {}
			obj[searchAuctionDto.sortBy] = 'ASC'
			req.order =  obj;
		}
		
		if (searchAuctionDto.page > 1) {
			req.skip = 25 * (searchAuctionDto.page - 1);
		}
		// add page to req
		if (searchAuctionDto.productId){
			req.productId = Equal(searchAuctionDto.productId)
			//add to req
		} 
		if (searchAuctionDto.productIds) {
			req.productId = In(searchAuctionDto.productIds);
		}
		if (searchAuctionDto.description) {
			req.name = Like("%" + searchAuctionDto.name + " #%")
		}
		if (searchAuctionDto.minPrice && searchAuctionDto.maxPrice) {
			req.price_levels = Between(searchAuctionDto.minPrice, searchAuctionDto.maxPrice)
		} else if (searchAuctionDto.minPrice) {
			req.price_levels = LessThanOrEqual(searchAuctionDto.minPrice);
		}   else if (searchAuctionDto.maxPrice) {
			req.price_levels = LessThanOrEqual(searchAuctionDto.maxPrice);
		}
		if (searchAuctionDto.name) {
			req.name = Like("%" + searchAuctionDto.name + "%")
		}
		if (searchAuctionDto.endDate) {
			req.end_date = LessThan(searchAuctionDto.endDate/3600);
		}
		return req;
	}

	/**
	 * search auctions in data base.
	 * @param searchAuctionDto - the received request.
	 */
	searchAuctionInDto = async (searchAuctionDto: SearchAuctionsDto): Promise<[Auction[], number]> => {
		const req: QueryFilterDto = this.createQuery(searchAuctionDto);
		return await this.auctionRepository.findAndCount(req);
	}
	
	/**
	 * search auctions.
	 * @param searchAuctionDto - the received request.
	 */
	searchAuction = async (createAuctionDto: SearchAuctionsDto): Promise<{auctions: Auction[], numberOfQueryAuctions: number, hasMore: boolean}> => {	
		if (this.productsService.haveProductFilters(createAuctionDto)) {
			const products = await this.productsService.searchProductsInDto(createAuctionDto, ['id']);
			const productIds = products.map((prod: Product) => prod.id);
			if(productIds.length) {
				createAuctionDto = {...createAuctionDto, productIds} 
			} else {
				return {auctions: [], numberOfQueryAuctions: 0, hasMore: false}
			}
		}
		const [auctions, numberOfQueryAuctions] = await this.searchAuctionInDto(createAuctionDto);
		const hasMore = auctions.length === Number(createAuctionDto.rbp) && auctions.length < numberOfQueryAuctions
		return {auctions, numberOfQueryAuctions, hasMore};
	}
}
