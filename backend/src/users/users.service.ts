import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { isValidCpf, sanitizeCpf } from '../common/cpf.js';
import { LoginDto } from './dto/login.dto.js';
import { RegisterDto } from './dto/register.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { UserResponseDto } from './dto/user-response.dto.js';
import { UsersRepository } from './users.repository.js';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async register(dto: RegisterDto) {
    if (!isValidCpf(dto.cpf)) {
      throw new BadRequestException('CPF inválido.');
    }

    const cpf = sanitizeCpf(dto.cpf);
    if (await this.usersRepository.findByEmail(dto.email)) {
      throw new ConflictException('Este e-mail já está cadastrado.');
    }
    if (await this.usersRepository.findByCpf(cpf)) {
      throw new ConflictException('Este CPF já está cadastrado.');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = await this.usersRepository.create({
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
      cpf,
      passwordHash,
    });
    return new UserResponseDto(user);
  }

  async login(dto: LoginDto) {
    const user = await this.usersRepository.findByEmail(dto.email);
    const matches = user ? await bcrypt.compare(dto.password, user.passwordHash) : false;
    if (!user || !matches) {
      throw new UnauthorizedException('E-mail ou senha incorretos.');
    }
    return new UserResponseDto(user);
  }

  async update(id: string, dto: UpdateUserDto) {
    if (!(await this.usersRepository.findById(id))) {
      throw new NotFoundException('Usuário não encontrado');
    }
    const user = await this.usersRepository.update(id, dto);
    return new UserResponseDto(user);
  }
}
