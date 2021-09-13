import { MigrationInterface, QueryRunner } from 'typeorm';

export class EventNullFields1631518791595 implements MigrationInterface {
    name = 'EventNullFields1631518791595';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`events\` CHANGE \`description\` \`description\` varchar(255) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`events\` CHANGE \`minAge\` \`minAge\` tinyint NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`events\` CHANGE \`price\` \`price\` decimal NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`events\` CHANGE \`sponsor\` \`sponsor\` varchar(255) NULL`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`events\` CHANGE \`sponsor\` \`sponsor\` varchar(255) NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`events\` CHANGE \`price\` \`price\` decimal NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`events\` CHANGE \`minAge\` \`minAge\` tinyint NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`events\` CHANGE \`description\` \`description\` varchar(255) NOT NULL`,
        );
    }
}
