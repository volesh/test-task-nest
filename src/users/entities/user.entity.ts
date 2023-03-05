import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Role } from '../../roles/entities/role.entity';
import { RoleEnum } from '../../roles/enums/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => User, (user) => user.id, { nullable: true })
  boss: number;

  @ManyToOne(() => Role, (role) => role.id, { nullable: false })
  role: number;

  @Column({ type: 'enum', enum: RoleEnum, nullable: false })
  role_id: RoleEnum;

  @Column({ nullable: true })
  boss_id: number;
}
