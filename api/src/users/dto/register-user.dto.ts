import { IsEmail, IsNotEmpty, IsOptional, Length } from 'class-validator'

export class RegisterUserDto {
  @IsNotEmpty()
  @Length(4)
  username: string

  @IsNotEmpty()
  password: string

  @IsOptional()
  @IsEmail()
  email?: string
}
