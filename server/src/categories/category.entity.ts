import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm'
import { Product } from 'src/products/product.entity';
import { Auction } from 'src/auctions/auction.entity';
import { Brand } from 'src/brands/brand.entity';
import { SubCategory } from 'src/sub-categories/sub_category.entity';

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

    @OneToMany(() => SubCategory, sub_category => sub_category.category, { eager: false })
    sub_categories: SubCategory[];

    @ManyToMany(() => Brand)
    @JoinTable()
    brands: Brand[]
}