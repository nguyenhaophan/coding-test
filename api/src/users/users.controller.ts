import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'

import { RegisterUserDto } from './dto/register-user.dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('all')
  getAll() {
    return this.usersService.getAll()
  }

  @Post('register')
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.usersService.registerUser(registerUserDto)
  }

  @Delete('delete/:userId')
  deleteUser(@Param('userId') userId: string) {
    return this.usersService.deleteUser(userId)
  }
}
