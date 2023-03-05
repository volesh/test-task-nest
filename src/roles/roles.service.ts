import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './entities/role.entity';
import { RoleEnum } from './enums/role.enum';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private RoleRepository: Repository<Role>,
  ) {}
  create(createRoleDto: CreateRoleDto): Promise<Role> {
    return this.RoleRepository.save({
      ...createRoleDto,
      value: createRoleDto.value,
    });
  }
  findByValue(value: RoleEnum): Promise<Role> {
    return this.RoleRepository.findOne({
      where: { value },
    });
  }
}
