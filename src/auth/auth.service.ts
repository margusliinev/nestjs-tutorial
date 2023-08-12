import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { ConflictException } from '@nestjs/common/exceptions';
import bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}

    private exclude(user: User, key: keyof User) {
        delete user[key];
        return user;
    }

    async register(registerDto: RegisterDto) {
        const doesEmailExist = await this.prisma.user.findUnique({ where: { email: registerDto.email } });

        if (doesEmailExist) {
            throw new ConflictException({ message: 'Email is already in use', statusCode: 409, error: 'email' });
        }

        const hash = await bcrypt.hash(registerDto.password, 10);

        const user = await this.prisma.user.create({ data: { ...registerDto, password: hash } });
        this.exclude(user, 'password');

        return { success: true, data: user };
    }

    async login(loginDto: LoginDto) {
        const user = await this.prisma.user.findUnique({ where: { email: loginDto.email } });

        if (!user) {
            throw new ConflictException({ message: 'Email or password is incorrect', statusCode: 409, error: 'email' });
        }

        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

        if (!isPasswordValid) {
            throw new ConflictException({ message: 'Email or password is incorrect', statusCode: 409, error: 'email' });
        }
        this.exclude(user, 'password');

        return { success: true, data: user };
    }

    logout() {
        return `This action logs a user out`;
    }
}
