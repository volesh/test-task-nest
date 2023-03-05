import { IsNotEmpty, IsNumber } from 'class-validator';

export class ChangeUsersBossDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  newBossId: number;
}
