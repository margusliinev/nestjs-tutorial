import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommentsService {
    constructor(private prisma: PrismaService) {}

    async create(postId: number, createCommentDto: CreateCommentDto, sub: number) {
        const post = await this.prisma.post.findUnique({ where: { id: postId } });
        if (!post) {
            throw new NotFoundException({ message: 'Post not found', statusCode: 404, error: 'post' });
        }

        const newComment = await this.prisma.comment.create({ data: { ...createCommentDto, authorId: sub, postId: postId } });
        if (!newComment) {
            throw new InternalServerErrorException({ message: 'Failed creating a comment', statusCode: 500, error: 'server' });
        }
        return newComment;
    }

    async findAll(postId: number) {
        const comments = await this.prisma.comment.findMany({ where: { postId: postId } });
        if (comments.length < 1) {
            throw new NotFoundException({ message: 'No comments found', statusCode: 404, error: 'comment' });
        }
        return comments;
    }

    async remove(params: { postId: number; commentId: number }) {
        const comment = await this.prisma.comment.findUnique({ where: { id: params.commentId, postId: params.postId } });
        if (!comment) {
            throw new NotFoundException({ message: 'Comment not found', statusCode: 404, error: 'comment' });
        }

        const deletedComment = await this.prisma.comment.delete({ where: { id: params.commentId, postId: params.postId } });
        if (!deletedComment) {
            throw new InternalServerErrorException({ message: 'Failed deleting a comment', statusCode: 500, error: 'server' });
        }
        return deletedComment;
    }
}
