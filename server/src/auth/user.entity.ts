import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany, ManyToOne  } from 'typeorm'
import * as bcrypt from 'bcryptjs'
import { Auction } from 'src/auctions/auction.entity';
import { Product } from 'src/products/product.entity';
import { Account } from 'src/accounts/account.entity';

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

  @Column()
  accountId: number;

  @Column()
  last_login: Date;

  @Column()
  salt: string;

  // @Column()
  // created_at: Date;

  @OneToMany(type => Auction, auction => auction.user, { eager: true })
  auctions: Auction[];

  @ManyToOne(type => Account, account => account.users, { eager: false })
  account: Account

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt)
    return this.password === hash
  }
}