import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCommentDto {
    @ApiProperty()
    @Length(3, 100, { message: 'Comment must be between 3 and 500 characters', context: { error: 'comment', statusCode: 400 } })
    @IsString({ message: 'Invalid value' })
    @IsNotEmpty({ message: 'Comment is required', context: { error: 'comment', statusCode: 400 } })
    content: string;
}
