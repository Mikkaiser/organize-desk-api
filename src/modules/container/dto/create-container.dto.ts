import { IsNotEmpty } from 'class-validator';
import { ContainerCategory } from '../enums/container-category.enum';
import { ContainerType } from '../enums/container-type.enum';
import { ContainerInterface } from '../interfaces/container.interface';

export class CreateContainerDto implements ContainerInterface {
  @IsNotEmpty({ message: 'código: campo obrigatório' })
  code: string;

  @IsNotEmpty({ message: 'id do cliente: campo obrigatório' })
  customerId: number;

  @IsNotEmpty({ message: 'tipo do container: campo obrigatório' })
  type: ContainerType;

  @IsNotEmpty({ message: 'Container cheio: campo obrigatório' })
  isFull: boolean;

  @IsNotEmpty({ message: 'Categoria: campo obrigatório' })
  category: ContainerCategory;
}
