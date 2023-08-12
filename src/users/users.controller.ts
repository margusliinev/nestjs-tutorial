import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express';
import { AuthGuard } from '../auth/auth.guard';

interface AuthenticatedRequest extends Request {
    user: {
        sub: number;
    };
    cookies: {
        token: string;
    };
}

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('me')
    @UseGuards(AuthGuard)
    async findCurrentUser(@Req() req: AuthenticatedRequest) {
        const sub = req.user.sub;
        const { user } = await this.usersService.findCurrentUser(sub);
        return { success: true, data: user };
    }
}
