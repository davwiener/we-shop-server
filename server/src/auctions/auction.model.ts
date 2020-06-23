export interface Auction {
    id: string,
    product_id: string,
    price_levels: Object,
    status: AuctionStatus,
    end_date: Date,
    // subscribers: 
    supplier_id: string
}

export enum AuctionStatus {
    LIVE = 'LIVE',
    ENDED = 'ENDED',
    PENDING = 'PENDING'
}