import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ContainerCategory } from '../enums/container-category.enum';
import { ContainerType } from '../enums/container-type.enum';
import { ContainerInterface } from '../interfaces/container.interface';

@Entity('containers')
export class ContainerEntity implements ContainerInterface {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  code: string;

  @Column({ name: 'customer_id' })
  customerId: number;

  @Column()
  type: ContainerType;

  @Column({ name: 'is_full' })
  isFull: boolean;

  @Column()
  category: ContainerCategory;
}