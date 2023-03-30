import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { JwtPayload } from './interface/jwt-payload.interface';
import * as bcrypt from 'bcryptjs';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<UserEntity> {
    const user = await this.userService.findByUsername(username);
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  }

  async validateUserByJwtPayload(payload: JwtPayload): Promise<UserEntity> {
    return await this.userService.findOneById(payload.sub);
  }

  async login(user: UserEntity) {
    const payload: JwtPayload = { sub: user.id, username: user.username };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '30d',
    });
    return { accessToken, refreshToken };
  }

  async refresh(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const user = await this.userService.findOneById(payload.sub);
      if (user) {
        const accessToken = this.jwtService.sign(payload);
        return { accessToken };
      }
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
