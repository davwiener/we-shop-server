import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, ManyToMany, JoinTable, Index } from 'typeorm'
import { Product } from 'src/products/product.entity';
import { Auction } from 'src/auctions/auction.entity';
import { Brand } from 'src/brands/brand.entity';
import { Category } from 'src/categories/category.entity';
import { Model } from 'src/models/models.entity';

@Entity()
export class SubCategory extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Index()
    id: number;

    @Column()
    @Index()
    name: string;

    @Column()
    created_at: Date;

    @ManyToOne(() => Category, category => category.sub_categories, {
        eager: false,
        cascade: true
    })
    category: SubCategory;

    @ManyToMany(() => Brand, brand => brand.subCategories)
    @JoinTable()
    brands: Brand[]

    @OneToMany(() => Model, models => models.subCategory)
    models: Model[];

    @OneToMany(() => Product, product => product.category, { eager: false })
    products: Product[];
}