import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common'

import { AuthService } from 'src/auth/auth.service'
import { JwtAuthGuard } from 'src/auth/jwt-strategy/jwt-auth.guard'
import { LocalAuthGuard } from 'src/auth/local-strategy/local-auth.guard'
import { RegisterUserDto } from './dto/register-user.dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('all')
  getAll() {
    return this.usersService.getAll()
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  loginUser(@Request() req: any) {
    return this.authService.login(req.user)
  }

  @Post('register')
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.usersService.registerUser(registerUserDto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:userId')
  deleteUser(@Param('userId') userId: string) {
    return this.usersService.deleteUser(userId)
  }
}
