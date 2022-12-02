import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableCustomer1669944569806 implements MigrationInterface {
  private customerTable = new Table({
    name: 'customers',
    columns: [
      {
        name: 'id',
        type: 'integer',
        generationStrategy: 'increment',
        isGenerated: true,
        isPrimary: true,
      },
      {
        name: 'email',
        type: 'varchar',
        length: '255',
      },
      {
        name: 'name',
        type: 'varchar',
        length: '255',
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.customerTable);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.customerTable);
  }
}
