import { IsNotEmpty, MinLength, MaxLength, Matches, IsEmail } from 'class-validator'

export class SignUpCredentialsDto {
  
  @IsEmail()
  email: string;

  @MinLength(8)
  @MaxLength(20)
  // @Matches(/^(?=.*\d])(?=.*\W+)(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.).*$/, { message: 'invalid password' })
  password: string;

  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;
}