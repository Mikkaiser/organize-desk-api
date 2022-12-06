import { ContainerEntity } from './../../container/entities/container.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ContainerHandlingInterface } from '../interfaces/container-handling.interface';

@Entity('container_handlings')
export class ContainerHandlingEntity implements ContainerHandlingInterface {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'begins_at' })
  beginsAt: Date;

  @Column({ name: 'ends_at' })
  endsAt: Date;

  @Column({ name: 'container_id' })
  containerId: number;

  @ManyToOne(() => ContainerEntity, (container) => container.containerHandlings)
  @JoinColumn({ name: 'container_id' })
  container: ContainerEntity;
}
