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
        name: 'customer_cpf',
        type: 'varchar',
        length: '255',
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

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.containerTable);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.containerTable);
  }
}
