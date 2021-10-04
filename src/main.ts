import { ApiKeyGuard } from './guards/api-key.guard';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

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

    await app.listen(port);
}
bootstrap();
