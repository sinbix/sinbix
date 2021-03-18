import { MigrationInterface, QueryRunner } from 'typeorm';

export class cascade1616049310786 implements MigrationInterface {
  name = 'cascade1616049310786';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_profile" DROP CONSTRAINT "FK_51cb79b5555effaf7d69ba1cff9"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_profile" ADD CONSTRAINT "FK_51cb79b5555effaf7d69ba1cff9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_profile" DROP CONSTRAINT "FK_51cb79b5555effaf7d69ba1cff9"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_profile" ADD CONSTRAINT "FK_51cb79b5555effaf7d69ba1cff9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
