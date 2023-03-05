import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Role } from './roles/entities/role.entity';
import { RolesModule } from './roles/roles.module';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    RolesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST || 'localhost',
      port: +process.env.PORT || 5432,
      username: process.env.POSTGRES_USER_NAME || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'postgres',
      database: process.env.POSTGRES_DB_NAME || 'postgres',
      entities: [User, Role],
      synchronize: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
