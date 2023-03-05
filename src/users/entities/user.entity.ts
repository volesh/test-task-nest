import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

import { Role } from '../../roles/entities/role.entity';
import { RoleEnum } from '../../roles/enums/role.enum';

@Entity()
@Tree('materialized-path')
export class User {
  @ApiProperty({ example: 2 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Ivan' })
  @Column()
  name: string;

  @ApiProperty({ example: 'ivan@gmail.com' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: 'qwer1234' })
  @Column()
  password: string;

  @ApiModelProperty({ type: User })
  @TreeParent()
  boss: User;

  @ApiProperty({ example: 1 })
  @ManyToOne(() => Role, (role) => role.id, { nullable: false })
  role: number;

  @ApiProperty({ example: 'boss' })
  @Column({ type: 'enum', enum: RoleEnum, nullable: false })
  role_id: RoleEnum;

  @ApiModelProperty({ type: User, isArray: true })
  @TreeChildren()
  users: User[];

  @ApiProperty({ example: 1 })
  @Column({ nullable: true })
  boss_id: number;
}
