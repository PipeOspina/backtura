import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSponsorPageField1633631331095 implements MigrationInterface {
    name = 'AddSponsorPageField1633631331095';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`events\` ADD \`sponsorPage\` longtext NULL`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`events\` DROP COLUMN \`sponsorPage\``,
        );
    }
}
