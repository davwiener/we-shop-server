import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { User } from "src/auth/user.entity";
import { Category } from "src/categories/category.entity";
import { Auction } from "src/auctions/auction.entity";

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  created_at: Date

  @Column()
  userId: number

  @Column()
  categoryId: number

  @ManyToOne(type => Category, category => category.products, { eager: false })
  category: Category

  @OneToMany(type => Auction, auction => auction.product, { eager: true })
  auctions: Auction[]
}