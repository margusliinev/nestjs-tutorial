import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    register() {
        return `This action registers a user`;
    }

    login() {
        return `This action logs a user in`;
    }

    logout() {
        return `This action logs a user out`;
    }
}
