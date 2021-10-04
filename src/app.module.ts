import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from './config/app.config';
import { DatabaseConfig } from './config/database.config';
import { EventsModule } from './modules/events/events.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { IconsModule } from './modules/icons/icons.module';

console.log(process.env.NEST_ENV);

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [config],
            envFilePath:
                process.env.NEST_ENV === 'development'
                    ? '.env.development.local'
                    : process.env.NEST_ENV === 'test'
                    ? '.env.test.local'
                    : '.env.production.local',
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useClass: DatabaseConfig,
        }),
        EventsModule,
        CategoriesModule,
        IconsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
