import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index } from 'typeorm'
import { Brand } from 'src/brands/brand.entity';
import { Category } from 'src/categories/category.entity';
import { SubCategory } from 'src/sub-categories/sub_category.entity';

@Entity()
export class Model extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Index()
    name: string;

    @Column()
    created_at: Date;

    @ManyToOne(() => Category, category => category.models, {
        eager: false,
        cascade: true
    })
    category: Category;

    @ManyToOne(() => SubCategory, sub_category => sub_category.models, {
        eager: false,
        cascade: true
    })
    sub_category: SubCategory;

    @ManyToOne(() => Category, brand => brand.models, {
        eager: false,
        cascade: true
    })
    brand: Brand;

}