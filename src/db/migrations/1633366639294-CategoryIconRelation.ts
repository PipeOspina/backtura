import { MigrationInterface, QueryRunner } from 'typeorm';

export class CategoryIconRelation1633366639294 implements MigrationInterface {
    name = 'CategoryIconRelation1633366639294';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`categories\` DROP FOREIGN KEY \`FK_1eff0de0a3d9e41ef91f9051cc1\``,
        );
        await queryRunner.query(
            `DROP INDEX \`REL_1eff0de0a3d9e41ef91f9051cc\` ON \`Culthurum\`.\`categories\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`categories\` CHANGE \`icon_id\` \`iconId\` int NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`categories\` ADD CONSTRAINT \`FK_ed10932e758e99eacee885b831f\` FOREIGN KEY (\`iconId\`) REFERENCES \`Culthurum\`.\`icons\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`categories\` DROP FOREIGN KEY \`FK_ed10932e758e99eacee885b831f\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`categories\` CHANGE \`iconId\` \`icon_id\` int NULL`,
        );
        await queryRunner.query(
            `CREATE UNIQUE INDEX \`REL_1eff0de0a3d9e41ef91f9051cc\` ON \`Culthurum\`.\`categories\` (\`icon_id\`)`,
        );
        await queryRunner.query(
            `ALTER TABLE \`Culthurum\`.\`categories\` ADD CONSTRAINT \`FK_1eff0de0a3d9e41ef91f9051cc1\` FOREIGN KEY (\`icon_id\`) REFERENCES \`Culthurum\`.\`icons\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }
}
