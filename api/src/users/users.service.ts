import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as bcrypt from 'bcrypt'

import { RegisterUserDto } from './dto/register-user.dto'
import { UserDocument } from './user.schema'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private userModel: Model<UserDocument>,
  ) {}

  async getAll(): Promise<UserDocument[]> {
    return await this.userModel.find()
  }

  async registerUser(registerUserDto: RegisterUserDto): Promise<UserDocument> {
    const existedUser = await this.userModel.findOne({
      username: registerUserDto.username,
    })

    if (existedUser) {
      throw new ConflictException('Username existed')
    }

    // Hasing password with bcrypt
    const salt = await bcrypt.genSalt(10)
    registerUserDto.password = await bcrypt.hash(registerUserDto.password, salt)

    return await this.userModel.create(registerUserDto)
  }

  async deleteUser(userId: string) {
    const foundUser = await this.userModel.findByIdAndDelete(userId)

    if (!foundUser) {
      throw new NotFoundException('User not found')
    }

    return 'User deleted successfully'
  }
}
