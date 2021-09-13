import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export const databaseConfig = (): MysqlConnectionOptions => ({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    entities: ['dist/**/**/*.entity{.js,.ts}'],
    synchronize: false,
    logging: !!process.env.DB_LOGGING,
    migrations: ['dist/src/db/migrations/*{.js,.ts}'],
    cli: {
        migrationsDir: 'src/db/migrations',
    },
});

export const config = () => ({
    database: databaseConfig(),
});
