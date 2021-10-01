import { MigrationInterface, QueryRunner } from 'typeorm';

export class Rebuild1632962843683 implements MigrationInterface {
    name = 'Rebuild1632962843683';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`Culthurum\`.\`categories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`color\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`Culthurum\`.\`locations\` (\`id\` int NOT NULL AUTO_INCREMENT, \`latitude\` decimal(10,8) NOT NULL, \`longitude\` decimal(11,8) NOT NULL, \`address\` varchar(255) NOT NULL, \`country\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`specs\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`Culthurum\`.\`schedules\` (\`id\` int NOT NULL AUTO_INCREMENT, \`start_date\` datetime NOT NULL, \`end_date\` datetime NOT NULL, \`event_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`Culthurum\`.\`hour_hands\` (\`id\` int NOT NULL AUTO_INCREMENT, \`start_time\` time NOT NULL, \`end_time\` time NOT NULL, \`schedule_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`Culthurum\`.\`events\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`min_age\` tinyint NULL, \`price\` decimal NULL, \`sponsor\` int NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`location_id\` int NULL, UNIQUE INDEX \`REL_fccf31c64ec14a66276e999973\` (\`location_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`Culthurum\`.\`images\` (\`id\` int NOT NULL AUTO_INCREMENT, \`url\` varchar(255) NOT NULL, \`event_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`schedules\` ADD CONSTRAINT \`FK_783fc338057c960828af8a3d007\` FOREIGN KEY (\`event_id\`) REFERENCES \`Culthurum\`.\`events\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`hour_hands\` ADD CONSTRAINT \`FK_a1947d1d6167ab5f9599b74e7e5\` FOREIGN KEY (\`schedule_id\`) REFERENCES \`Culthurum\`.\`schedules\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`events\` ADD CONSTRAINT \`FK_fccf31c64ec14a66276e9999730\` FOREIGN KEY (\`location_id\`) REFERENCES \`Culthurum\`.\`locations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
            `ALTER TABLE \`Culthurum\`.\`events\` DROP FOREIGN KEY \`FK_fccf31c64ec14a66276e9999730\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`hour_hands\` DROP FOREIGN KEY \`FK_a1947d1d6167ab5f9599b74e7e5\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`schedules\` DROP FOREIGN KEY \`FK_783fc338057c960828af8a3d007\``,
        );
        await queryRunner.query(`DROP TABLE \`Culthurum\`.\`images\``);
        await queryRunner.query(
            `DROP INDEX \`REL_fccf31c64ec14a66276e999973\` ON \`Culthurum\`.\`events\``,
        );
        await queryRunner.query(`DROP TABLE \`Culthurum\`.\`events\``);
        await queryRunner.query(`DROP TABLE \`Culthurum\`.\`hour_hands\``);
        await queryRunner.query(`DROP TABLE \`Culthurum\`.\`schedules\``);
        await queryRunner.query(`DROP TABLE \`Culthurum\`.\`locations\``);
        await queryRunner.query(`DROP TABLE \`Culthurum\`.\`categories\``);
    }
}
