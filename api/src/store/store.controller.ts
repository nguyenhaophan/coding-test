import { Controller, Get, UseGuards } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { ConfigDataType } from 'config/config.type'
import { JwtAuthGuard } from 'src/auth/jwt-strategy/jwt-auth.guard'
import { StoreService } from './store.service'

@Controller('store')
export class StoreController {
  constructor(
    private readonly storeService: StoreService,
    private readonly configService: ConfigService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('all')
  getAll() {
    return this.configService.get<ConfigDataType>('configData')
  }
}
