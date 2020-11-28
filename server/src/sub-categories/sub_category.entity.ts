import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm'
import { Product } from 'src/products/product.entity';
import { Auction } from 'src/auctions/auction.entity';
import { Brand } from 'src/brands/brand.entity';
import { Category } from 'src/categories/category.entity';

@Entity()
export class SubCategory extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    created_at: Date;

    @ManyToOne(() => Category, category => category.sub_categories, { eager: true })
    category: Category[];
}