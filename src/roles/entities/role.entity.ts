import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { RoleEnum } from '../enums/role.enum';

@Entity()
export class Role {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'boss' })
  @Column({ type: 'enum', enum: RoleEnum, unique: true })
  value: RoleEnum;
}
