import { MigrationInterface, QueryRunner } from 'typeorm';

export class LocationsLatLngTypeAnotther1631567045256
    implements MigrationInterface
{
    name = 'LocationsLatLngTypeAnotther1631567045256';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`locations\` CHANGE \`latitude\` \`latitude\` decimal(10,8) NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`locations\` CHANGE \`longitude\` \`longitude\` decimal(11,8) NOT NULL`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`locations\` CHANGE \`longitude\` \`longitude\` decimal(10,0) NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`locations\` CHANGE \`latitude\` \`latitude\` decimal(10,0) NOT NULL`,
        );
    }
}
