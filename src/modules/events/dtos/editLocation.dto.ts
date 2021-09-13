import { PartialType } from '@nestjs/mapped-types';
import { CreateLocationBody } from './createLocation';

export class EditLocationBody extends PartialType(CreateLocationBody) {}
