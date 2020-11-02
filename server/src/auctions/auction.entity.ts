import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, Index } from 'typeorm'
import { AuctionStatus } from './auction-status.enum';
import { User } from 'src/auth/user.entity';
import { Product } from 'src/products/product.entity';

export interface PriceLevel {
    price: number;
    minSubscribers: number;
}
export interface PriceLevels {
    first: PriceLevel,
    seconed: PriceLevel,
    third?: PriceLevel
}
@Entity()
export class Auction extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Index()
    productId: number;


    @Column()
    @Index()
    currentPrice: number ;

    @Column()
    price_levels: string;

    @Column()
    @Index()
    status: AuctionStatus;

    @Column()
    @Index()
    end_date: number;

    @Column()
    description: string;

    @Column()
    @Index()
    name: string;

    @Column()
    created_at: Date;

    @Column()
    userId: number;

    @ManyToOne(type => User, user => user.auctions, { eager: false })
    user: User;

    @ManyToOne(type => Product, product => product.auctions, { eager: true })
    product: Product;
}