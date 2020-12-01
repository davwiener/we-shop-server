import { Injectable, ConflictException, InternalServerErrorException, UnauthorizedException, ServiceUnavailableException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { SignUpCredentialsDto } from './dto/sign-up-credentials.dto';
import * as bcrypt from 'bcryptjs'
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { SignInCredentialsDto } from './dto/sign-in-credentials.dto';
import { JwtPayload } from './jwt-payload.interface'
import { Account } from 'src/accounts/account.entity';
import * as moment from 'moment'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    private jwtService: JwtService
  ) {}

  signUp = async (signUpDto: SignUpCredentialsDto): Promise<{firstName: string, lastName: string}> => {
    const { email, password, first_name, last_name } = signUpDto
    const created_at = moment().format('YYYY-MM-DD HH:mm:ss');
    const last_login = moment().format('YYYY-MM-DD HH:mm:ss')
    const username = `${first_name.toLowerCase()}_${last_name.toLowerCase()}`
    try {
      const account_created = await this.accountRepository.save({
        name: username,
        created_at
      })
      if (account_created) {
        const salt = await bcrypt.genSalt()
        const pass = await this.hashPassword(password, salt)
        await this.userRepository.save({
          email,
          password: pass,
          first_name,
          last_name,
          salt,
          accountId: account_created.id,
          username,
          last_login,
          created_at
        }).then(res=> {
          return { firstName: res.first_name, lastName: res.last_name };
        })
      } else {
        await this.accountRepository.remove(account_created)
        return {firstName: '', lastName: ''}
      }
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('username or email already exist')
      }
      throw new InternalServerErrorException
    }
  }

  signIn = async (signInDto: SignInCredentialsDto): Promise<{ accessToken: string, username: string }> => {
    const { email, password } = signInDto
    const user = await this.userRepository.findOne({ email })

    if (user && await user.validatePassword(password)) {
      const payload: JwtPayload = { email: user.email }
      const accessToken = this.jwtService.sign(payload)
      return { accessToken, username: user.username }
    }
    throw new UnauthorizedException('invalid credentials')
  }

  private hashPassword = (password: string, salt: string): Promise<string> => {
    return bcrypt.hash(password, salt)
  }
}
