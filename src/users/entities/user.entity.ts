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
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @TreeParent()
  boss: User;

  @ManyToOne(() => Role, (role) => role.id, { nullable: false })
  role: number;

  @Column({ type: 'enum', enum: RoleEnum, nullable: false })
  role_id: RoleEnum;

  @TreeChildren()
  user: User[];

  @Column({ nullable: true })
  boss_id: number;
}
