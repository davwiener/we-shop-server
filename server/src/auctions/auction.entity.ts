import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { AuctionStatus } from './auction-status.enum';

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
}