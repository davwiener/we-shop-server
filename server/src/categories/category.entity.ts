import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm'
import { Product } from 'src/products/product.entity';
import { Auction } from 'src/auctions/auction.entity';
import { Brand } from 'src/brands/brand.entity';

@Entity()
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    created_at: Date;

    @OneToMany(() => Auction, auction => auction.category, { eager: false })
    auctions: Auction[];

    @OneToMany(() => Product, product => product.category, { eager: false })
    products: Product[];
}