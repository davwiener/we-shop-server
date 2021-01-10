import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Index, OneToMany, ManyToMany, JoinTable, ManyToOne, JoinColumn } from 'typeorm'
import { Model } from 'src/models/models.entity';
import { Product } from 'src/products/product.entity';
import { Category } from 'src/categories/category.entity';
import { SubCategory } from 'src/sub-categories/sub_category.entity';

@Entity()
export class Brand extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Index()
    id: number;

    @Column()
    @Index()
    name: string;

    @Column()
    created_at: Date;

    @OneToMany(() => Product, product => product.brand)
    products: Product[];

    @ManyToMany(() => Category, category => category.brands)
    @JoinTable()
    categories: Category[];

    @ManyToMany(() => SubCategory, sub_categories => sub_categories.brands)
    @JoinTable()
    subCategories: SubCategory[];

    @OneToMany(() => Model, models => models.brand , { eager: true })

    models: Model[];

    
    
}