import { IsNotEmpty } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty({ message: 'nome: campo obrigatório' })
  name: string;

  @IsNotEmpty({ message: 'email: campo obrigatório' })
  email: string;
}
