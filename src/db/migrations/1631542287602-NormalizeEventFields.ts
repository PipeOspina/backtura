import { MigrationInterface, QueryRunner } from 'typeorm';

export class NormalizeEventFields1631542287602 implements MigrationInterface {
    name = 'NormalizeEventFields1631542287602';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`images\` DROP FOREIGN KEY \`FK_6a583d8235697646ab49f93fd54\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`images\` CHANGE \`eventId\` \`event_id\` int NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`events\` DROP COLUMN \`minAge\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`events\` DROP COLUMN \`isActive\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`events\` DROP COLUMN \`createdAt\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`events\` DROP COLUMN \`updatedAt\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`events\` ADD \`min_age\` tinyint NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`events\` ADD \`is_active\` tinyint NOT NULL DEFAULT 1`,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`events\` ADD \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`events\` ADD \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`images\` ADD CONSTRAINT \`FK_0a3351e268b89ef4c8ff8c58679\` FOREIGN KEY (\`event_id\`) REFERENCES \`Culthurum\`.\`events\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`images\` DROP FOREIGN KEY \`FK_0a3351e268b89ef4c8ff8c58679\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`events\` DROP COLUMN \`updated_at\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`events\` DROP COLUMN \`created_at\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`events\` DROP COLUMN \`is_active\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`events\` DROP COLUMN \`min_age\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`events\` ADD \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`events\` ADD \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`events\` ADD \`isActive\` tinyint NOT NULL DEFAULT '1'`,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`events\` ADD \`minAge\` tinyint NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`images\` CHANGE \`event_id\` \`eventId\` int NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`images\` ADD CONSTRAINT \`FK_6a583d8235697646ab49f93fd54\` FOREIGN KEY (\`eventId\`) REFERENCES \`Culthurum\`.\`events\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }
}
