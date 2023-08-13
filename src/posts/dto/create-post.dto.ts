import { IsBoolean, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreatePostDto {
    @Length(3, 50, { message: 'Title must be between 3 and 50 characters', context: { error: 'title', statusCode: 400 } })
    @IsString({ message: 'Invalid value' })
    @IsNotEmpty({ message: 'Title is required', context: { error: 'title', statusCode: 400 } })
    title: string;

    @Length(3, 500, { message: 'Content must be between 3 and 500 characters', context: { error: 'content', statusCode: 400 } })
    @IsString({ message: 'Invalid value' })
    @IsNotEmpty({ message: 'Content is required', context: { error: 'content', statusCode: 400 } })
    content: string;

    @IsBoolean({ message: 'Invalid value' })
    @IsNotEmpty({ message: 'Published is required', context: { error: 'published', statusCode: 400 } })
    published: boolean;
}
