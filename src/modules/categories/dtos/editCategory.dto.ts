import { PartialType } from '@nestjs/swagger';
import { CreateCategory } from './createCategory.dto';

export class EditCategoryBody extends PartialType(CreateCategory) {}
