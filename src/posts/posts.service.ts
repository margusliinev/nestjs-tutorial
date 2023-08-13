import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostsService {
    constructor(private prisma: PrismaService) {}

    async create(createPostDto: CreatePostDto, sub: number) {
        const post = await this.prisma.post.create({ data: { ...createPostDto, authorId: sub } });
        return post;
    }

    async findAll() {
        return await this.prisma.post.findMany();
    }

    async remove(id: number) {
        return await this.prisma.post.delete({ where: { id } });
    }
}
