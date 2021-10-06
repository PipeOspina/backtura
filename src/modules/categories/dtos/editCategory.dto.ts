import { PartialType } from '@nestjs/swagger';
import { CreateCategoryBody } from './createCategory.dto';

export class EditCategoryBody extends PartialType(CreateCategoryBody) {}
