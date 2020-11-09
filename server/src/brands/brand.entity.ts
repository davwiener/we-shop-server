import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Index, OneToMany, ManyToMany, JoinTable } from 'typeorm'
import { Model } from 'src/models/models.entity';
import { Product } from 'src/products/product.entity';
import { Category } from 'src/categories/category.entity';

@Entity()
export class Brand extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Index()
    name: string;

    @Column()
    created_at: Date;

    @OneToMany(() => Model, model => model.brand, { eager: true })
    models: Model[];

    @OneToMany(() => Product, product => product.brand)
    products: Product[];

    @ManyToMany(() => Category)
    @JoinTable()
    categories: Category[]
}