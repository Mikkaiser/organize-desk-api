import { ContainerCategory } from './../enums/container-category.enum';
import { ContainerType } from '../enums/container-type.enum';

export interface ContainerInterface {
  id?: number;
  code: string;
  customerCpf: string;
  type: ContainerType;
  isFull: boolean;
  category: ContainerCategory;
}
