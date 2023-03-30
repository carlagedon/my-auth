import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.username,
      loginDto.password,
    );
    if (!user) {
      return { success: false, message: 'Invalid credentials' };
    }
    const tokens = await this.authService.login(user);
    return { success: true, tokens };
  }

  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  async refresh(@Request() req) {
    const tokens = await this.authService.refresh(req.user.refreshToken);
    return { success: true, tokens };
  }
}
