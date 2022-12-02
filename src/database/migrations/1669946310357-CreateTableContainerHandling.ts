import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableContainerHandling1669946310357
  implements MigrationInterface
{
  private containerHandlingTable = new Table({
    name: 'container_handlings',
    columns: [
      {
        name: 'id',
        type: 'integer',
        generationStrategy: 'increment',
        isGenerated: true,
        isPrimary: true,
      },
      {
        name: 'type',
        type: 'enum',
        enum: [
          'Embarque',
          'Descarga',
          'Gate In',
          'Gate Out',
          'Reposicionamento',
          'Pesagem',
          'Scanner',
        ],
      },
      {
        name: 'begins_at',
        type: 'datetime',
      },
      {
        name: 'ends_at',
        type: 'datetime',
      },
      {
        name: 'container_id',
        type: 'integer',
      },
    ],
  });

  private containerIdForeignKey = new TableForeignKey({
    name: 'fk_container_container_handling_id',
    columnNames: ['container_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'containers',
    onDelete: 'CASCADE',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.containerHandlingTable);
    await queryRunner.createForeignKey(
      this.containerHandlingTable,
      this.containerIdForeignKey,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.containerHandlingTable);
    await queryRunner.dropForeignKey(
      this.containerHandlingTable,
      this.containerIdForeignKey,
    );
  }
}
