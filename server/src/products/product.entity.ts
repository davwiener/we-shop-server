import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "src/auth/user.entity";

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(type => User, user => user.products, { eager: false })
  user: User

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  created_at: Date

  @Column()
  userId: number
}