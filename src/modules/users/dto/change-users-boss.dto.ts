import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ChangeUsersBossDto {
  @ApiProperty({ example: 2, required: true })
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @ApiProperty({ example: 5, required: true })
  @IsNotEmpty()
  @IsNumber()
  newBossId: number;
}
