import { MigrationInterface, QueryRunner } from 'typeorm';

export class LocationsLatLngType1631566772028 implements MigrationInterface {
    name = 'LocationsLatLngType1631566772028';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`locations\` DROP COLUMN \`point\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`locations\` ADD \`latitude\` decimal NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`locations\` ADD \`longitude\` decimal NOT NULL`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`locations\` DROP COLUMN \`longitude\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`locations\` DROP COLUMN \`latitude\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`locations\` ADD \`point\` point NOT NULL`,
        );
    }
}
