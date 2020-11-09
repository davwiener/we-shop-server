import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index } from 'typeorm'
import { Brand } from 'src/brands/brand.entity';

@Entity()
export class Model extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Index()
    name: string;

    @Column()
    created_at: Date;

    @ManyToOne(() => Brand, brand => brand.models, { eager: false })
    brand: Brand
}