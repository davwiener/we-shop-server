import { Injectable, ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { SignUpCredentialsDto } from './dto/sign-up-credentials.dto';
import * as bcrypt from 'bcrypt'
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { SignInCredentialsDto } from './dto/sign-in-credentials.dto';
import { JwtPayload } from './jwt-payload.interface'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  signUp = async (signUpDto: SignUpCredentialsDto): Promise<void> => {
    const { email, username, password, first_name, last_name } = signUpDto
    const salt = await bcrypt.genSalt()
    const pass = await this.hashPassword(password, salt)
    try {
      await this.userRepository.save({
        email,
        password: pass,
        username,
        first_name,
        last_name,
        salt
      })
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('username or email already exist')
      }
      throw new InternalServerErrorException
    }
  }

  signIn = async (signInDto: SignInCredentialsDto): Promise<{ accessToken: string }> => {
    const { email, password } = signInDto
    const user = await this.userRepository.findOne({ email })

    if (user && await user.validatePassword(password)) {
      const payload: JwtPayload = { email: user.email }
      const accessToken = this.jwtService.sign(payload)
      return { accessToken }
    }
    throw new UnauthorizedException('invalid credentials')
  }

  private hashPassword = (password: string, salt: string): Promise<string> => {
    return bcrypt.hash(password, salt)
  }
}
