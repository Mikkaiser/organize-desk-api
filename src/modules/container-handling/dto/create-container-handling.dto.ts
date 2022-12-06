import { IsNotEmpty } from 'class-validator';
import { ContainerHandlingInterface } from './../interfaces/container-handling.interface';
export class CreateContainerHandlingDto implements ContainerHandlingInterface {
  @IsNotEmpty({ message: 'data de início: campo obrigatório' })
  beginsAt: Date;

  @IsNotEmpty({ message: 'data de fim: campo obrigatório' })
  endsAt: Date;

  @IsNotEmpty({ message: 'id do container: campo obrigatório' })
  containerId: number;
}
