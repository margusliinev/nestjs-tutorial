import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
    @IsEmail({}, { message: 'Email is not valid' })
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @IsString({ message: 'Invalid value' })
    @IsNotEmpty({ message: 'Password is required' })
    password: string;
}
