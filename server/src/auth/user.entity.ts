import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany  } from 'typeorm'
import * as bcrypt from 'bcryptjs'
import { Auction } from 'src/auctions/auction.entity';
import { Product } from 'src/products/product.entity';

@Entity()
@Unique(['email'])
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  // @Column()
  // account_id: number;

  // @Column()
  // last_login: Date;

  @Column()
  salt: string;

  // @Column()
  // created_at: Date;

  @OneToMany(type => Auction, auction => auction.user, { eager: true })
  auctions: Auction[];

  @OneToMany(type => Product, product => product.user, { eager: true })
  products: Product[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt)
    return this.password === hash
  }
}