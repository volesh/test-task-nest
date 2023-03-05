import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { RoleEnum } from '../enums/role.enum';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: RoleEnum, unique: true })
  value: RoleEnum;
}
