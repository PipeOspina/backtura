import { PartialType } from '@nestjs/mapped-types';
import { CreateIconBody } from './createIcon.dto';

export class EditIconBody extends PartialType(CreateIconBody) {}
