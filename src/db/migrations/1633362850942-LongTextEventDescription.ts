import { MigrationInterface, QueryRunner } from 'typeorm';

export class LongTextEventDescription1633362850942
    implements MigrationInterface
{
    name = 'LongTextEventDescription1633362850942';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP INDEX \`IDX_1eff0de0a3d9e41ef91f9051cc\` ON \`Culthurum\`.\`categories\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`events\` DROP COLUMN \`description\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`events\` ADD \`description\` longtext NULL`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`events\` DROP COLUMN \`description\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`events\` ADD \`description\` varchar(255) NULL`,
        );
        await queryRunner.query(
            `CREATE UNIQUE INDEX \`IDX_1eff0de0a3d9e41ef91f9051cc\` ON \`Culthurum\`.\`categories\` (\`icon_id\`)`,
        );
    }
}
