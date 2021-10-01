import { MigrationInterface, QueryRunner } from 'typeorm';

export class IconClass1633121440634 implements MigrationInterface {
    name = 'IconClass1633121440634';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`Culthurum\`.\`icons\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`type\` enum ('ICON_TYPES/MATERIAL_UI', 'ICON_TYPES/CUSTOM') NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`categories\` ADD \`icon_id\` int NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`categories\` ADD UNIQUE INDEX \`IDX_1eff0de0a3d9e41ef91f9051cc\` (\`icon_id\`)`,
        );
        await queryRunner.query(
            `CREATE UNIQUE INDEX \`REL_1eff0de0a3d9e41ef91f9051cc\` ON \`Culthurum\`.\`categories\` (\`icon_id\`)`,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`categories\` ADD CONSTRAINT \`FK_1eff0de0a3d9e41ef91f9051cc1\` FOREIGN KEY (\`icon_id\`) REFERENCES \`Culthurum\`.\`icons\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`categories\` DROP FOREIGN KEY \`FK_1eff0de0a3d9e41ef91f9051cc1\``,
        );
        await queryRunner.query(
            `DROP INDEX \`REL_1eff0de0a3d9e41ef91f9051cc\` ON \`Culthurum\`.\`categories\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`categories\` DROP INDEX \`IDX_1eff0de0a3d9e41ef91f9051cc\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`categories\` DROP COLUMN \`icon_id\``,
        );
        await queryRunner.query(`DROP TABLE \`Culthurum\`.\`icons\``);
    }
}
