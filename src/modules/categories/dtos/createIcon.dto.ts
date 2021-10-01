import { IsEnum, IsString } from 'class-validator';
import { IconTypes } from '../enums/icon.enums';

export class CreateIconBody {
    @IsString()
    name: string;

    @IsEnum(IconTypes)
    type: IconTypes;
}
