import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    private exclude(user: User, key: keyof User) {
        delete user[key];
        return user;
    }

    async findCurrentUser(sub: number) {
        const user = await this.prisma.user.findUnique({ where: { id: sub } });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        this.exclude(user, 'password');

        return { user };
    }
}
