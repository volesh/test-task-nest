import { IsEnum, IsLowercase, IsNotEmpty } from 'class-validator';

import { RoleEnum } from '../enums/role.enum';

export class CreateRoleDto {
  @IsEnum(RoleEnum)
  @IsNotEmpty()
  @IsLowercase()
  value: RoleEnum;
}
