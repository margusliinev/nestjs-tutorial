import { Controller, Get, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';

interface AuthenticatedRequest extends Request {
    user: {
        sub: number;
    };
    cookies: {
        token: string;
    };
}

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('me')
    async findCurrentUser(@Req() req: AuthenticatedRequest) {
        const sub = req.user.sub;
        const { user } = await this.usersService.findCurrentUser(sub);
        return { success: true, data: user };
    }
}
