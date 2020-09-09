import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Product } from 'src/products/product.entity';

@Entity()
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    created_at: Date;

    @OneToMany(type => Product, product => product.category, { eager: true })
    products: Product[];
}