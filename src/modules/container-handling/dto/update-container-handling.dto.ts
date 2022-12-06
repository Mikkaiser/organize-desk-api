import { PartialType } from '@nestjs/mapped-types';
import { CreateContainerHandlingDto } from './create-container-handling.dto';

export class UpdateContainerHandlingDto extends PartialType(
  CreateContainerHandlingDto,
) {
  id: number;
}
