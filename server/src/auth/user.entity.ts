import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany  } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { Auction } from 'src/auctions/auction.entity';

@Entity()
@Unique(['email'])
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(type => Auction, auction => auction.user, { eager: true })
  auctions: Auction[]

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
  account_id: number;

  @Column()
  last_login: Date;

  @Column()
  salt: string;

  @Column()
  created_at: Date;

  validatePassword = async (password: string): Promise<boolean> => {
    const hash = await bcrypt.hash(password, this.salt)
    return this.password === hash
  }
}