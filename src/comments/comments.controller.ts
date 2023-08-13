import { Controller, Get, Post, Body, Param, Delete, Req, HttpCode } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { AuthenticatedRequest } from '../types';

@Controller('posts/:postId/comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @Post()
    async create(@Param('postId') postId: string, @Body() createCommentDto: CreateCommentDto, @Req() req: AuthenticatedRequest) {
        const newComment = await this.commentsService.create(+postId, createCommentDto, req.user.sub);
        return { success: true, message: 'Created new comment', data: newComment };
    }

    @Get()
    async findAll(@Param('postId') postId: string) {
        const comments = await this.commentsService.findAll(+postId);
        return { success: true, message: 'All comments', data: comments };
    }

    @Delete(':commentId')
    @HttpCode(204)
    async remove(@Param() params: { postId: string; commentId: string }) {
        const postId = +params.postId;
        const commentId = +params.commentId;
        const deletedComment = await this.commentsService.remove({ postId, commentId });
        return { success: true, message: 'Deleted comment', data: deletedComment };
    }
}
