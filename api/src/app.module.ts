import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/coding-test'),
    ConfigModule.forRoot({ isGlobal: true, cache: true }), // import .env file
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
