import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableContainer1669946269649 implements MigrationInterface {
  private containerTable = new Table({
    name: 'containers',
    columns: [
      {
        name: 'id',
        type: 'integer',
        generationStrategy: 'increment',
        isGenerated: true,
        isPrimary: true,
      },
      {
        name: 'code',
        type: 'char',
        length: '11',
      },
      {
        name: 'customer_id',
        type: 'integer',
      },
      {
        name: 'type',
        type: 'enum',
        enum: ['20/40', '30/60', '40/80'],
      },
      {
        name: 'is_full',
        type: 'bit',
      },
      {
        name: 'category',
        type: 'enum',
        enum: ['Importação', 'Exportação'],
      },
    ],
  });

  private customerIdForeignKey = new TableForeignKey({
    name: 'fk_customer_container_id',
    columnNames: ['customer_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'customer',
    onDelete: 'CASCADE',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.containerTable);
    await queryRunner.createForeignKey(
      this.containerTable,
      this.customerIdForeignKey,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.containerTable);
    await queryRunner.dropForeignKey(
      this.containerTable,
      this.customerIdForeignKey,
    );
  }
}
