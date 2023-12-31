import { SetMetadata } from '@nestjs/common';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

const AllowUnauthorizedRequest = () => SetMetadata('allowUnauthorizedRequest', true);

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    @AllowUnauthorizedRequest()
    async register(@Body() registerDto: RegisterDto) {
        const { user } = await this.authService.register(registerDto);
        return { success: true, message: 'User registered', data: user };
    }

    @Post('login')
    @AllowUnauthorizedRequest()
    async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
        const { user, token } = await this.authService.login(loginDto);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production' ? true : false,
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 24,
        });
        return { success: true, message: 'User logged in', data: user };
    }

    @Post('logout')
    @AllowUnauthorizedRequest()
    logout(@Res({ passthrough: true }) res: Response) {
        res.clearCookie('token');
        return { success: true, message: 'User logged out' };
    }
}
