import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { IRequest } from '../interfaces/request.interface';
import { ChangeUsersBossDto } from './dto/change-users-boss.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { RoleGuard } from './guards/role.guard';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(readonly usersService: UsersService) {}

  @ApiResponse({ type: User })
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @ApiResponse({ type: User })
  @Get()
  @UseGuards(AuthGuard())
  getAll(@Req() req: IRequest): Promise<User[] | User> {
    return this.usersService.findAll(req);
  }

  @ApiResponse({ type: User })
  @Patch()
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard())
  changeBoss(
    @Req() req: IRequest,
    @Body() changeUsersBossDto: ChangeUsersBossDto,
  ): Promise<User> {
    return this.usersService.changeBoss(changeUsersBossDto, req.user.id);
  }
}
