import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PasswordHelper } from '../helpers/password.helper';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BearerStrategy } from './bearer.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UsersModule,
    PassportModule.register({
      defaultStrategy: 'bearer',
      property: 'user',
      session: false,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, BearerStrategy, PasswordHelper, JwtService],
  exports: [PassportModule],
})
export class AuthModule {}
