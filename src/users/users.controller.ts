import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { IRequest } from '../interfaces/request.interface';
import { ChangeUsersBossDto } from './dto/change-users-boss.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  getAll(@Req() req: IRequest): Promise<User[] | User> {
    return this.usersService.findAll(req);
  }

  @Patch()
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  changeBoss(
    @Req() req: IRequest,
    @Body() changeUsersBossDto: ChangeUsersBossDto,
  ): Promise<User> {
    return this.usersService.changeBoss(changeUsersBossDto, req.user.id);
  }
}
