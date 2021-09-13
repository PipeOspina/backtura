import {MigrationInterface, QueryRunner} from "typeorm";

export class LocationRelation1631564626176 implements MigrationInterface {
    name = 'LocationRelation1631564626176'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Culthurum\`.\`events\` CHANGE \`location\` \`location_id\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Culthurum\`.\`events\` DROP COLUMN \`location_id\``);
        await queryRunner.query(`ALTER TABLE \`Culthurum\`.\`events\` ADD \`location_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`Culthurum\`.\`events\` ADD UNIQUE INDEX \`IDX_fccf31c64ec14a66276e999973\` (\`location_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_fccf31c64ec14a66276e999973\` ON \`Culthurum\`.\`events\` (\`location_id\`)`);
        await queryRunner.query(`ALTER TABLE \`Culthurum\`.\`events\` ADD CONSTRAINT \`FK_fccf31c64ec14a66276e9999730\` FOREIGN KEY (\`location_id\`) REFERENCES \`Culthurum\`.\`locations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Culthurum\`.\`events\` DROP FOREIGN KEY \`FK_fccf31c64ec14a66276e9999730\``);
        await queryRunner.query(`DROP INDEX \`REL_fccf31c64ec14a66276e999973\` ON \`Culthurum\`.\`events\``);
        await queryRunner.query(`ALTER TABLE \`Culthurum\`.\`events\` DROP INDEX \`IDX_fccf31c64ec14a66276e999973\``);
        await queryRunner.query(`ALTER TABLE \`Culthurum\`.\`events\` DROP COLUMN \`location_id\``);
        await queryRunner.query(`ALTER TABLE \`Culthurum\`.\`events\` ADD \`location_id\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Culthurum\`.\`events\` CHANGE \`location_id\` \`location\` varchar(255) NOT NULL`);
    }

}
