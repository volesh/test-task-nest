import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'ivan@gmail.com', required: true })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ example: 'qwer1234', required: true })
  @IsNotEmpty()
  @IsString()
  password: string;
}
