import { PartialType } from '@nestjs/mapped-types';
import { CreateCategory } from './createCategory.dto';

export class EditCategoryBody extends PartialType(CreateCategory) {}
