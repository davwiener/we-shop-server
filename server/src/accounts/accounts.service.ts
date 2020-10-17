import { Injectable } from '@nestjs/common';
import { Account } from './account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { AccountDataDto } from './dto/account-data.dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private accountsRepository: Repository<Account>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  getAccountData = async (user: User): Promise<AccountDataDto> => {
    const account = await this.accountsRepository.findOne({ id: user.accountId })
    return {
      accountName: account.name,
      userName: user.username
    } 
  }

  updateAccountData = async (user: User, accountName: string, userName: string): Promise<Account> => {
    await this.userRepository.save({ id: user.id, username: userName })
    return await this.accountsRepository.save({ id: user.accountId, name: accountName })
  }
}