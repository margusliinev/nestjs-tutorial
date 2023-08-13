import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');
    app.use(cookieParser());
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

    const config = new DocumentBuilder().setTitle('NestJS API').setDescription('NestJS API').setVersion('1.0').build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(5000);
}
void bootstrap();
