import { Controller, Get, UseGuards, ValidationPipe, Put, Query, Body } from '@nestjs/common';
import { Account } from './account.entity';
import { AccountsService } from './accounts.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('accounts')
export class AccountsController {
  constructor(private accountsService: AccountsService) {}

  @Get('/my_account')
  @UseGuards(AuthGuard())
  getAccountData(@GetUser(ValidationPipe) user: User): Promise<Account> {
    return this.accountsService.getAccountData(user)
  }

  @Put('/update')
  @UseGuards(AuthGuard())
  updateAccountData(
    @GetUser(ValidationPipe) user: User,
    @Body('accountName') accountName: string,
    @Body('userName') userName: string,
  ): Promise<Account> {
    return this.accountsService.updateAccountData(user, accountName, userName)
  }
}
