import { ContainerHandlingEntity } from './../modules/container-handling/entities/container-handling.entity';
import { ContainerEntity } from './../modules/container/entities/container.entity';
import { CustomerEntity } from './../modules/customer/entities/customer.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { CreateTableCustomer1669944569806 } from './migrations/1669944569806-CreateTableCustomer';
import { CreateTableContainer1669946269649 } from './migrations/1669946269649-CreateTableContainer';
import { CreateTableContainerHandling1669946310357 } from './migrations/1669946310357-CreateTableContainerHandling';

config();

export const options: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  migrations: [
    CreateTableCustomer1669944569806,
    CreateTableContainer1669946269649,
    CreateTableContainerHandling1669946310357,
  ],
  entities: [CustomerEntity, ContainerEntity, ContainerHandlingEntity],
  synchronize: false,
};

export default new DataSource(options);
