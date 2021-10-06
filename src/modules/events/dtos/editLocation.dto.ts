import { PartialType } from '@nestjs/swagger';
import { CreateLocationBody } from './createLocation';

export class EditLocationBody extends PartialType(CreateLocationBody) {}
