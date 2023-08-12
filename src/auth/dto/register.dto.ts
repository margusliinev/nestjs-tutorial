import { IsEmail, IsNotEmpty, IsString, Length, MinLength, Matches } from 'class-validator';

export class RegisterDto {
    @Matches(/^[a-zA-Z0-9-]+$/, { message: 'Username can only contain letters, numbers, and hyphens' })
    @Matches(/^[a-zA-Z0-9]/, { message: 'Username must start with a letter or number' })
    @Matches(/^[^-].*[^-]$/, { message: 'Username cannot start or end with a hyphen.' })
    @IsString({ message: 'Invalid value' })
    @Length(3, 16, { message: 'Username must be between 3 and 16 characters' })
    @IsNotEmpty({ message: 'Username is required.', context: { error: 'username', statusCode: 400 } })
    username: string;

    @IsEmail({}, { message: 'Email is not valid' })
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @Matches(/.*[A-Za-z].*/, { message: 'Password must contain at least one letter' })
    @Matches(/.*\d.*/, { message: 'Password must contain at least one number' })
    @IsString({ message: 'Invalid value' })
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @IsNotEmpty({ message: 'Password is required' })
    password: string;

    @Matches(/^[A-Za-z]+$/, { message: 'First name can only contain letters from a-z' })
    @IsString({ message: 'Invalid value' })
    @Length(2, 30, { message: 'First name must be between 2 and 30 characters long' })
    @IsNotEmpty({ message: 'First name is required' })
    firstName: string;

    @Matches(/^[A-Za-z]+$/, { message: 'Last name can only contain letters from a-z' })
    @IsString({ message: 'Invalid value' })
    @Length(2, 30, { message: 'Last name must be between 2 and 30 characters long' })
    @IsNotEmpty({ message: 'Last name is required' })
    lastName: string;
}
