import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as Jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';

import { PasswordHelper } from '../../common/helpers/password.helper';
import { User } from '../users/entities/user.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) public userRepository: Repository<User>,
    private readonly passwordHelper: PasswordHelper,
  ) {}
  async login(data: LoginDto): Promise<{
    user: User;
    tokens: { accessToken: string; refreshToken: string };
  }> {
    const user = await this.userRepository.findOne({
      where: { email: data.email },
    });
    if (!user) {
      throw new NotFoundException({ message: 'User not found' });
    }
    const isPass = await this.passwordHelper.comparePas(
      data.password,
      user.password,
    );
    if (!isPass) {
      throw new BadRequestException({ message: 'Wrong password' });
    }
    const { email, name, id, role_id } = user;
    const payload = { email, name, id, role_id };
    const accessToken = Jwt.sign(
      payload,
      process.env.ACCESS_SECRET_KEY || 'access_secret',
      { expiresIn: '1d' },
    );
    const refreshToken = Jwt.sign(
      payload,
      process.env.REFRESH_SECRET_KEY || 'refresh_secret',
      {
        expiresIn: '7d',
      },
    );
    return {
      user,
      tokens: {
        accessToken,
        refreshToken,
      },
    };
  }
}
