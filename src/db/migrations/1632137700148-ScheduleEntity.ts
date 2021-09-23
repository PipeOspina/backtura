import { MigrationInterface, QueryRunner } from 'typeorm';

export class ScheduleEntity1632137700148 implements MigrationInterface {
    name = 'ScheduleEntity1632137700148';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`Culthurum\`.\`schedules\` (\`id\` int NOT NULL AUTO_INCREMENT, \`start_date\` datetime NOT NULL, \`end_date\` datetime NOT NULL, \`event_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`Culthurum\`.\`hour_hands\` (\`id\` int NOT NULL AUTO_INCREMENT, \`start_time\` time NOT NULL, \`end_time\` time NOT NULL, \`schedule_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`events\` DROP COLUMN \`schedule\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`schedules\` ADD CONSTRAINT \`FK_783fc338057c960828af8a3d007\` FOREIGN KEY (\`event_id\`) REFERENCES \`Culthurum\`.\`events\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`hour_hands\` ADD CONSTRAINT \`FK_a1947d1d6167ab5f9599b74e7e5\` FOREIGN KEY (\`schedule_id\`) REFERENCES \`Culthurum\`.\`schedules\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`hour_hands\` DROP FOREIGN KEY \`FK_a1947d1d6167ab5f9599b74e7e5\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`schedules\` DROP FOREIGN KEY \`FK_783fc338057c960828af8a3d007\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`events\` ADD \`schedule\` varchar(255) NOT NULL`,
        );
        await queryRunner.query(`DROP TABLE \`Culthurum\`.\`hour_hands\``);
        await queryRunner.query(`DROP TABLE \`Culthurum\`.\`schedules\``);
    }
}
