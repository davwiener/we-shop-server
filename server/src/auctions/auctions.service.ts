import { Injectable, NotFoundException } from '@nestjs/common';
import { Auction } from './auction.entity';
import { AuctionStatus } from './auction-status.enum';
import { CreateAuctionDto, SearchAuctionsDto } from './dto/create-auction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Not, LessThan, Like, Equal, LessThanOrEqual, Between } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { Product } from 'src/products/product.entity';
import { ProductsService } from 'src/products/products.service';
import { QueryFilterDto } from './dto/query-filter.dto';
import * as moment from 'moment'

@Injectable()
export class AuctionsService {
	constructor(
			@InjectRepository(Auction)
			private auctionRepository: Repository<Auction>,
			@InjectRepository(Product)
			private productRepository: Repository<Product>,
			private productsService: ProductsService 
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
		return await this.auctionRepository.find({ select: ['id', 'product', 'name', 'status'], where: { user: user.id } })
	}

	createAuction = async (createAuctionDto: CreateAuctionDto, user: User): Promise<Auction> => {
		const { endDate, priceLevels, name, category, subCategory, product } = createAuctionDto;
		const formatedPriceLevels = priceLevels.reduce((acc: any, curr: any, index: any) => {
			acc[index] = curr
			return acc
		}, {})
		console.log('end date 2', moment(endDate).format('DD-MM-YYYY HH:mm:ss'))
		const auction = {
			end_date: moment(endDate).format('DD-MM-YYYY HH:mm:ss'),
			price_levels: JSON.stringify(formatedPriceLevels),
			currentPrice: 1,
			name,
			status: AuctionStatus.PENDING,
			categoryId: category,
			// subCategoryId: subCategory,
			productId: product, 
			created_at: new Date(),
			userId: 1
		}
		return await this.auctionRepository.save(auction)
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
			req.name = Like("%" + searchAuctionDto.description + " #%")
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
