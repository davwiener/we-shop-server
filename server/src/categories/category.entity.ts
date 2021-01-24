import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, Index } from 'typeorm'
import { Product } from 'src/products/product.entity';
import { Auction } from 'src/auctions/auction.entity';
import { Brand } from 'src/brands/brand.entity';
import { SubCategory } from 'src/sub-categories/sub_category.entity';
import { Model } from 'src/models/models.entity';

@Entity()
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Index()
    name: string;

    @Column()
    created_at: Date;

    @OneToMany(() => Product, product => product.category, { eager: false })
    products: Product[];

    @OneToMany(() => SubCategory, sub_category => sub_category.category, { eager: true })

    sub_categories: SubCategory[];
    @ManyToMany(() => Brand)
    @JoinTable()
    brands: Brand[]

    @OneToMany(() => Model, models => models.category , { eager: true })

    models: Model[];
}