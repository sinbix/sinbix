import { MigrationInterface, QueryRunner } from 'typeorm';

export class update1616070105357 implements MigrationInterface {
  name = 'update1616070105357';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_profile" DROP COLUMN "firstName"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_profile" ADD "firstName" character varying(200) NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "user_profile" DROP COLUMN "lastName"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_profile" ADD "lastName" character varying(200) NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "email" character varying(200) NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "email" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "user_profile" DROP COLUMN "lastName"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_profile" ADD "lastName" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "user_profile" DROP COLUMN "firstName"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_profile" ADD "firstName" character varying NOT NULL`
    );
  }
}
