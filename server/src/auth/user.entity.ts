import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique  } from 'typeorm'

@Entity()
@Unique(['email'])
@Unique(['username'])
export class User extends BaseEntity {
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
    account_id: number;

    @Column()
    last_login: Date;

    @Column()
    salt: string;

    @Column()
    created_at: Date;
}