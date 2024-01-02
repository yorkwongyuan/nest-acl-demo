import { PartialType } from '@nestjs/mapped-types';
import { CreateADto } from './create-a.dto';

export class UpdateADto extends PartialType(CreateADto) {}
