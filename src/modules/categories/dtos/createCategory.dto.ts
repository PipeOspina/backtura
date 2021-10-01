import { Type } from 'class-transformer';
import {
    IsObject,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';
import { CreateIconBody } from './createIcon.dto';

export class CreateCategory {
    @IsString()
    name: string;

    @IsString()
    color: string;

    @IsObject()
    @ValidateNested()
    @Type(() => CreateIconBody)
    icon: CreateIconBody;

    @IsOptional()
    @IsString()
    description?: string;
}
