import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostsService {
    constructor(private prisma: PrismaService) {}

    async create(createPostDto: CreatePostDto, sub: number) {
        return await this.prisma.post.create({ data: { ...createPostDto, authorId: sub } });
    }

    async findAll() {
        return await this.prisma.post.findMany();
    }

    async findOne(id: number) {
        return await this.prisma.post.findFirst({ include: { comments: true }, where: { id } });
    }

    async remove(id: number) {
        const post = await this.prisma.post.findUnique({ where: { id } });
        if (!post) {
            throw new NotFoundException({ message: 'Post not found', statusCode: 404, error: 'post' });
        }

        return await this.prisma.post.delete({ where: { id } });
    }
}
