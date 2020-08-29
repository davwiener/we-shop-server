import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { User } from 'src/auth/user.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  created_at: Date;

  @OneToMany(type => User, user => user.account, { eager: false })
  users: User[];
}