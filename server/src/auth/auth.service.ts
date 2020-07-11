import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { SignUpCredentialsDto } from './dto/sign-up-credentials.dto';
import * as bcrypt from 'bcrypt'
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
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

  private hashPassword = (password: string, salt: string): Promise<string> => {
    return bcrypt.hash(password, salt)
  }
}
