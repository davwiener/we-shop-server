import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, Index } from "typeorm";
import { User } from "src/auth/user.entity";
import { Category } from "src/categories/category.entity";
import { Auction } from "src/auctions/auction.entity";
import { Model } from "src/models/models.entity";
import { Brand } from "src/brands/brand.entity";
import { SubCategory } from "src/sub-categories/sub_category.entity";

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @Index()
  name: string

  @Column()
  @Index()
  description: string

  @Column()
  created_at: Date

  @ManyToOne(() => Category, category => category.products)
  category: Category

  @ManyToOne(() => SubCategory, subCategory => subCategory.products)
  subCategory: SubCategory

  @ManyToOne(() => Brand, brand => brand.products, { eager: true })
  brand: Brand;

  @ManyToOne(() => Model, model => model.products, { eager: true })
  model: Model;

  @OneToMany(() => Auction, auction => auction.product, { eager: false })
  auctions: Auction[]




}