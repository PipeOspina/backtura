/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class FirstMigration1631511045372 implements MigrationInterface {
    public async up(_queryRunner: QueryRunner): Promise<void> {}

    public async down(_queryRunner: QueryRunner): Promise<void> {}
}
