import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PasswordHelper } from '../../common/helpers/password.helper';
import { IRequest } from '../../common/interfaces/request.interface';
import { Role } from '../roles/entities/role.entity';
import { RoleEnum } from '../roles/enums/role.enum';
import { RolesService } from '../roles/roles.service';
import { ChangeUsersBossDto } from './dto/change-users-boss.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) public userRepository: Repository<User>,
    @InjectRepository(Role) public roleRepository: Repository<Role>,
    private readonly roleService: RolesService,
    private readonly passwordHelper: PasswordHelper,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const isExist = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (isExist) {
      throw new HttpException(
        { message: 'User already exist' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const { id: roleId } = await this.roleService.findByValue(
      createUserDto.role,
    );
    const admin = await this.userRepository.findOne({
      where: { role_id: RoleEnum.Administrator },
    });
    if (!admin && createUserDto.role !== RoleEnum.Administrator) {
      throw new BadRequestException({ message: 'create admin first' });
    }
    if (admin && createUserDto.role === RoleEnum.Administrator) {
      throw new BadRequestException({ message: 'admin already exists' });
    }
    const hashedPassword = await this.passwordHelper.hashPass(
      createUserDto.password,
    );
    let boss;
    if (!createUserDto.boss && createUserDto.role !== RoleEnum.Administrator) {
      createUserDto.boss = admin.id;
    } else if (createUserDto.boss) {
      boss = await this.userRepository.findOne({
        where: { id: createUserDto.boss },
      });
      if (![RoleEnum.Boss, RoleEnum.Administrator].includes(boss.role_id)) {
        throw new UnauthorizedException({
          message: `User with id: ${createUserDto.boss} is not a boss`,
        });
      }
    }
    return this.userRepository.save({
      ...createUserDto,
      password: hashedPassword,
      role: roleId,
      boss,
      role_id: createUserDto.role,
      boss_id: createUserDto.boss,
    });
  }

  async findAll(req: IRequest): Promise<User> {
    const user = req.user;
    return this.userRepository.manager
      .getTreeRepository(User)
      .findDescendantsTree(user);
  }

  async findById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async changeBoss(
    changeUsersBossDto: ChangeUsersBossDto,
    id: number,
  ): Promise<User> {
    const { userId, newBossId } = changeUsersBossDto;
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (user.boss_id !== id) {
      throw new HttpException(
        { message: 'You cant chang boss for this user' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const boss = await this.userRepository.findOne({
      where: { id: newBossId },
    });
    if (
      boss?.role_id !== RoleEnum.Boss &&
      boss?.role_id !== RoleEnum.Administrator &&
      !boss
    ) {
      throw new HttpException(
        { message: `User with id ${newBossId} can't be a boss` },
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.userRepository.update({ id: userId }, { boss });
    return this.userRepository.findOne({ where: { id: userId } });
  }
}
