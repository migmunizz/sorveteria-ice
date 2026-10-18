import { Body, Controller, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto.js';
import { RegisterDto } from './dto/register.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { UsersService } from './users.service.js';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('auth/cadastro')
  async register(@Body() dto: RegisterDto) {
    return { user: await this.usersService.register(dto) };
  }

  @HttpCode(200)
  @Post('auth/login')
  async login(@Body() dto: LoginDto) {
    return { user: await this.usersService.login(dto) };
  }

  @Patch('minha-conta/:userId')
  update(@Param('userId') userId: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(userId, dto);
  }
}
