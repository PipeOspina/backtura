import { MigrationInterface, QueryRunner } from 'typeorm';

export class FirstEventEntity1631514120974 implements MigrationInterface {
    name = 'FirstEventEntity1631514120974';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`Culthurum\`.\`event\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`minAge\` tinyint NOT NULL, \`location\` varchar(255) NOT NULL, \`price\` decimal NOT NULL, \`sponsor\` varchar(255) NOT NULL, \`schedule\` varchar(255) NOT NULL, \`category\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`Culthurum\`.\`image\` (\`id\` int NOT NULL AUTO_INCREMENT, \`url\` varchar(255) NOT NULL, \`eventId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`image\` ADD CONSTRAINT \`FK_042895d4be7cf838f0f89949705\` FOREIGN KEY (\`eventId\`) REFERENCES \`Culthurum\`.\`event\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`image\` DROP FOREIGN KEY \`FK_042895d4be7cf838f0f89949705\``,
        );
        await queryRunner.query(`DROP TABLE \`Culthurum\`.\`image\``);
        await queryRunner.query(`DROP TABLE \`Culthurum\`.\`event\``);
    }
}
