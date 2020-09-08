import { Injectable, NotFoundException } from '@nestjs/common';
import { Auction } from './auction.entity';
import { AuctionStatus } from './auction-status.enum';
import { CreateAuctionDto, SearchAuctionsDto } from './dto/create-auction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { async } from 'rxjs/internal/scheduler/async';

@Injectable()
export class AuctionsService {
	constructor(
			@InjectRepository(Auction)
			private auctionRepository: Repository<Auction>,
	) {}

	getAllAuctions = async (user: User): Promise<Auction[]> => {
			return await this.auctionRepository.find({ id: user.id })
	}

	getAuctionById = async (id: number, user: User): Promise<Auction> => {
			const found = await this.auctionRepository.findOne({ where: { id, userId: user.id }})
			if (!found) {
					throw new NotFoundException()
			}
			return found
	}

	createAuction = async (createAuctionDto: CreateAuctionDto, user: User): Promise<Auction> => {
		const { end_date, price_levels, name, description } = createAuctionDto
		const auction = await this.auctionRepository.save({
			end_date,
			price_levels,
			name,
			description,
			user
		})
		delete(auction.user)
		return auction
	}
	searchAuction = async (createAuctionDto: SearchAuctionsDto): Promise<Auction | any> => { 
		// const {filters, rest} = createAuctionDto;
		//const temp = JSON.parse(createAuctionDto.toString());
		console.log(createAuctionDto);
		//console.log('page: ' + temp.page)
		//console.log('page not paresed: ' +createAuctionDto.page);
		//const page = temp.page;
		//const {page, q} = createAuctionDto.filters;
		//console.log("page:" + page);
		//console.log("rest" + q);
		return new Promise((resolve, reject) => {
			setTimeout(() => {
			  console.log("search");
			 // const num = Number(createAuctionDto.filters.page);
			  //console.log('page:' + createAuctionDto.filters.page)
			  //console.log(num);
			  const ret = Array.from(Array(20), (_, i) => i  + (createAuctionDto.page - 1) * 20);
				console.log(ret);
			  resolve(ret);
			}, 1500);
		});
	}

}
