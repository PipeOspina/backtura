import { MigrationInterface, QueryRunner } from 'typeorm';

export class EventDates1631517222361 implements MigrationInterface {
    name = 'EventDates1631517222361';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`Culthurum\`.\`events\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`minAge\` tinyint NOT NULL, \`location\` varchar(255) NOT NULL, \`price\` decimal NOT NULL, \`sponsor\` varchar(255) NOT NULL, \`schedule\` varchar(255) NOT NULL, \`category\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`Culthurum\`.\`images\` (\`id\` int NOT NULL AUTO_INCREMENT, \`url\` varchar(255) NOT NULL, \`eventId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`images\` ADD CONSTRAINT \`FK_6a583d8235697646ab49f93fd54\` FOREIGN KEY (\`eventId\`) REFERENCES \`Culthurum\`.\`events\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`images\` DROP FOREIGN KEY \`FK_6a583d8235697646ab49f93fd54\``,
        );
        await queryRunner.query(`DROP TABLE \`Culthurum\`.\`images\``);
        await queryRunner.query(`DROP TABLE \`Culthurum\`.\`events\``);
    }
}
