import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm'
import { AuctionStatus } from './auction-status.enum';
import { User } from 'src/auth/user.entity';
import { Product } from 'src/products/product.entity';

@Entity()
export class Auction extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    productId: number;

    @Column()
    price_levels: string;

    @Column()
    status: AuctionStatus;

    @Column()
    end_date: Date;

    @Column()
    description: string;

    @Column()
    name: string;

    @Column()
    created_at: Date;

    @Column()
    userId: number;

    @ManyToOne(type => User, user => user.auctions, { eager: false })
    user: User;

    @ManyToOne(type => Product, product => product.auctions, { eager: false })
    product: Product;
}