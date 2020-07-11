import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpCredentialsDto } from './dto/sign-up-credentials.dto';
import { SignInCredentialsDto } from './dto/sign-in-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) signUpDto: SignUpCredentialsDto): Promise<void> {
    return this.authService.signUp(signUpDto)
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) signInDto: SignInCredentialsDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(signInDto)
  }
}
