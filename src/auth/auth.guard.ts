import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

interface JwtPayload {
    sub: number;
}

interface AuthenticatedRequest extends Request {
    user: {
        sub: number;
    };
    cookies: {
        token: string;
    };
}

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request: AuthenticatedRequest = context.switchToHttp().getRequest();
        const token = request.cookies.token;

        if (!token) {
            throw new UnauthorizedException({ message: 'Unauthenticated request', statusCode: 401, error: 'server' });
        }

        try {
            const token = request.cookies.token;
            const { sub } = this.jwtService.verify<JwtPayload>(token, { secret: process.env.JWT_SECRET });

            request.user = { sub };

            return true;
        } catch (error) {
            throw new UnauthorizedException({ message: 'Unauthenticated request', statusCode: 401, error: 'server' });
        }
    }
}
