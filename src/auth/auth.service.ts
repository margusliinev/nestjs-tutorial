import { ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common/exceptions';
import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) {}

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

        if (!user) {
            throw new InternalServerErrorException({ message: 'Failed to register an account', statusCode: 500, error: 'server' });
        }

        this.exclude(user, 'password');

        return { user };
    }

    async login(loginDto: LoginDto) {
        const user = await this.prisma.user.findUnique({ where: { email: loginDto.email } });

        if (!user) {
            throw new UnauthorizedException({ message: 'Email or password is incorrect', statusCode: 401, error: 'email' });
        }

        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException({ message: 'Email or password is incorrect', statusCode: 401, error: 'password' });
        }

        this.exclude(user, 'password');

        const payload = { sub: user.id };
        const token = await this.jwtService.signAsync(payload, { secret: process.env.JWT_SECRET, expiresIn: process.env.JWT_LIFETIME });

        return { user, token };
    }
}
