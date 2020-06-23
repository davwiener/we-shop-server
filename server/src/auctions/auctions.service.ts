import { Injectable, NotFoundException } from '@nestjs/common';
import { Auction, AuctionStatus } from './auction.model';
import { CreateAuctionDto } from './dto/create-auction.dto';

@Injectable()
export class AuctionsService {
    private auctions: Auction[] = [
        {
            id: 'first_id',
            product_id: "prod_id",
            price_levels: {},
            status: AuctionStatus.PENDING,
            end_date: new Date(),
            // subscribers: 
            supplier_id: ""
        }
    ]

    getAllAuctions = (): Auction[] => {
        return this.auctions
    }

    getAuctionById = (id: string): Auction => {
        const found = this.auctions.find(auction => auction.id === id)
        if (!found) {
            throw new NotFoundException()
        }
        return found
    }

    createAuction = (createAuctionDto: CreateAuctionDto): Auction => {
        const { end_date, price_levels } = createAuctionDto
        const auction = {
            id: "",
            product_id: "",
            end_date: new Date(end_date),
            price_levels,
            status: AuctionStatus.PENDING,
            supplier_id: ""
        }
        this.auctions.push(auction)
        return auction
    }
}
