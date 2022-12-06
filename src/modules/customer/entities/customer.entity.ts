import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CustomersInterface } from '../interfaces/customers.interface';

@Entity('customers')
export class CustomerEntity implements CustomersInterface {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column()
  email: string;
}
