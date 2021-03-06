import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpCredentialsDto } from './dto/sign-up-credentials.dto';
import { SignInCredentialsDto } from './dto/sign-in-credentials.dto';
import { Logger } from '@nestjs/common';
import * as moment from 'moment'
@Controller('auth')
export class AuthController {
  logger = new Logger('auth');
  constructor(private authService: AuthService) {}
  @Post('/signup')
  signUp(@Body(ValidationPipe) signUpDto: SignUpCredentialsDto): Promise<{ firstName: string, lastName: string }> {
    this.logger.log('signup')
    //signUpDto.last_login = moment().format('YYYY-MM-DD HH:mm:ss')
    return this.authService.signUp(signUpDto)
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) signInDto: SignInCredentialsDto): Promise<{ accessToken: string }> {
    this.logger.log('signin')
    return this.authService.signIn(signInDto)
  }
}
