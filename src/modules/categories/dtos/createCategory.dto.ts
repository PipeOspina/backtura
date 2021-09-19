import { Type } from 'class-transformer';
import {
    IsInt,
    IsNumber,
    IsObject,
    IsOptional,
    IsString,
    Max,
    Min,
    ValidateNested,
} from 'class-validator';

export class CreateCategory{
    @IsString()
    name: string;

    @IsString()
    color: string;

    @IsOptional()
    @IsString()
    description?: string;
}