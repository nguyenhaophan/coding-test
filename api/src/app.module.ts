import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'

import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { StoreModule } from './store/store.module'
import config from 'config/config'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/coding-test'),
    ConfigModule.forRoot({ isGlobal: true, cache: true, load: [config] }), // import .env and config file
    UsersModule,
    AuthModule,
    StoreModule,
  ],
})
export class AppModule {}
