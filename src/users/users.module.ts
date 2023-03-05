import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportModule, PassportStrategy } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PasswordHelper } from '../helpers/password.helper';
import { Role } from '../roles/entities/role.entity';
import { RolesService } from '../roles/roles.service';
import { BearerStrategy } from './bearer.strategy';
import { User } from './entities/user.entity';
import { AuthGuard } from './guards/auth.guard';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    PassportModule.register({
      defaultStrategy: 'bearer',
      property: 'user',
      session: false,
    }),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    PasswordHelper,
    RolesService,
    AuthGuard,
    BearerStrategy,
    JwtService,
  ],
  exports: [UsersService, PassportModule],
})
export class UsersModule {}
