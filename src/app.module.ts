import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';

@Module({
    imports: [UsersModule, PostsModule, PrismaModule, AuthModule, CommentsModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
