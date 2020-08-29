import { Injectable } from '@nestjs/common';
import { Account } from './account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private accountsRepository: Repository<Account>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  getAccountData = async (user: User): Promise<Account> => {
    return await this.accountsRepository.findOne({ id: user.accountId })
  }

  updateAccountData = async (user: User, name: string): Promise<Account> => {
    return await this.accountsRepository.save({ id: user.accountId, name })
  }
}