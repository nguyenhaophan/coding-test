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

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  loginUser(@Request() req: any) {
    return this.authService.login(req.user)
  }

  @Post('register')
  async registerUser(@Body() registerUserDto: RegisterUserDto) {
    const registerdUser = await this.usersService.registerUser(registerUserDto)
    return this.authService.login(registerdUser)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:userId')
  deleteUser(@Param('userId') userId: string) {
    return this.usersService.deleteUser(userId)
  }
}
