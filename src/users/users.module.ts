import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PasswordHelper } from '../helpers/password.helper';
import { Role } from '../roles/entities/role.entity';
import { RolesService } from '../roles/roles.service';
import { User } from './entities/user.entity';
import { AuthGuard } from './guards/auth.guard';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  controllers: [UsersController],
  providers: [UsersService, PasswordHelper, RolesService, AuthGuard],
  exports: [UsersService],
})
export class UsersModule {}
