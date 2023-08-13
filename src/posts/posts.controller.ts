import { Controller, Get, Post, Body, Param, Delete, Req, HttpCode } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { AuthenticatedRequest } from '../types';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Post()
    async create(@Body() createPostDto: CreatePostDto, @Req() req: AuthenticatedRequest) {
        const newPost = await this.postsService.create(createPostDto, req.user.sub);
        return { success: true, message: 'Created new post', data: newPost };
    }

    @Get()
    async findAll() {
        const posts = await this.postsService.findAll();
        return { success: true, message: 'Returned all posts', data: posts };
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const post = await this.postsService.findOne(+id);
        return { success: true, message: 'Returned a post', data: post };
    }

    @Delete(':id')
    @HttpCode(204)
    async remove(@Param('id') id: string) {
        const deletedPost = await this.postsService.remove(+id);
        return { success: true, message: 'Deleted a post', data: deletedPost };
    }
}
