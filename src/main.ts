import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
        new ValidationPipe({
            exceptionFactory(errors) {
                const validationErrors = errors.map((error) => error.constraints);
                const validationProperties = errors.map((error) => error.property);
                console.log(validationErrors);
                return new BadRequestException({
                    message: Object.values(validationErrors[0] || {})[0],
                    error: validationProperties[0] || 'error',
                    statusCode: 400,
                });
            },
        })
    );
    app.use(cookieParser());
    await app.listen(5000);
}
void bootstrap();
