import { IsEmail, IsNotEmpty } from 'class-validator'

export class AccountDataDto {
  accountName: string;
  userName: string;
}