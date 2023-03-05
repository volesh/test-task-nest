import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { RoleEnum } from '../../roles/enums/role.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Ivan@gmail.com', required: true })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'qwer1234', required: true })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 1, required: true })
  @IsNumber()
  @IsOptional()
  boss: number;

  @ApiProperty({ example: 'boss', required: true })
  @IsEnum(RoleEnum)
  @IsNotEmpty()
  role: RoleEnum;
}
