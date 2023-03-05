import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsLowercase, IsNotEmpty } from 'class-validator';

import { RoleEnum } from '../enums/role.enum';

export class CreateRoleDto {
  @ApiProperty({ example: 'regular', required: true })
  @IsEnum(RoleEnum)
  @IsNotEmpty()
  @IsLowercase()
  value: RoleEnum;
}
