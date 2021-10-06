import { ApiKeyGuard } from './guards/api-key.guard';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });
    const port = process.env.PORT || 3000;

    app.enableVersioning();
    // app.enableCors();
    app.useGlobalGuards(new ApiKeyGuard());

    app.useGlobalPipes(
        new ValidationPipe({
            forbidNonWhitelisted: true,
            forbidUnknownValues: true,
            whitelist: true,
        }),
    );

    const options = new DocumentBuilder()
        .setTitle('Backtura')
        .setDescription('GIStura events API')
        .setVersion('1.0.0')
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'Token',
            },
            'API KEY',
        )
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('v1', app, document);

    await app.listen(port);
}
bootstrap();
