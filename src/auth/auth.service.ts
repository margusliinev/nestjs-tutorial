import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { ConflictException } from '@nestjs/common/exceptions';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}

    async register(registerDto: RegisterDto) {
        const doesEmailExist = await this.prisma.user.findUnique({ where: { email: registerDto.email } });

        if (doesEmailExist) {
            throw new ConflictException('Email is already in use');
        }

        const hash = await bcrypt.hash(registerDto.password, 10);

        const user = await this.prisma.user.create({ data: { ...registerDto, password: hash } });

        return user;
    }

    async login(loginDto: LoginDto) {
        const user = await this.prisma.user.findUnique({ where: { email: loginDto.email } });

        if (!user) {
            throw new ConflictException('Email or password is incorrect');
        }

        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

        if (!isPasswordValid) {
            throw new ConflictException('Email or password is incorrect');
        }

        return user;
    }

    logout() {
        return `This action logs a user out`;
    }
}
