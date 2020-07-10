import { Injectable, NotFoundException } from '@nestjs/common';
import { Auction } from './auction.entity';
import { AuctionStatus } from './auction-status.enum';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';

@Injectable()
export class AuctionsService {
    constructor(
        @InjectRepository(Auction)
        private auctionRepository: Repository<Auction>,
    ) {}

    getAllAuctions = (): Promise<Auction[]> => {
        return this.auctionRepository.find()
    }

    getAuctionById = (id: string): Promise<Auction> => {
        const found = this.auctionRepository.findOne(id)
        if (!found) {
            throw new NotFoundException()
        }
        return found
    }

	createAuction = async (createAuctionDto: CreateAuctionDto) => {
		const { end_date, price_levels } = createAuctionDto		
		// const auction = {
		// 	product_id: "",
		// 	end_date: new Date(end_date),
		// 	price_levels,
		// 	status: AuctionStatus.PENDING,
		// }
		return await this.auctionRepository.save()
		// const res = await getConnection()
		// 	.createQueryBuilder()
		// 	.insert()
		// 	.into(Auction)
		// 	.values([{ end_date: new Date(end_date), price_levels, product_id: 1, status: AuctionStatus.PENDING }])
		// 	.execute()
		// console.log('done inserting', res);
		
	}
}
