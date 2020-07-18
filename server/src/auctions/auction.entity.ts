import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { AuctionStatus } from './auction-status.enum';
import { User } from 'src/auth/user.entity';

@Entity()
export class Auction extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    product_id: number;

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
}