import { MigrationInterface, QueryRunner } from 'typeorm';

export class EventCategoryRelation1633366984683 implements MigrationInterface {
    name = 'EventCategoryRelation1633366984683';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`events\` ADD \`categoryId\` int NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`events\` ADD CONSTRAINT \`FK_2f7107d3528147b9237b6e2a2fe\` FOREIGN KEY (\`categoryId\`) REFERENCES \`Culthurum\`.\`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`events\` DROP FOREIGN KEY \`FK_2f7107d3528147b9237b6e2a2fe\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`events\` DROP COLUMN \`categoryId\``,
        );
    }
}
