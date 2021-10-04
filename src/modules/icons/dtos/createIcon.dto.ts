import { IsEnum, IsString } from 'class-validator';
import { IconTypes } from '../enums/icon.enums';

export class CreateIconBody {
    @IsString()
    name: string;

    @IsEnum(IconTypes, {
        message: `type must be ${IconTypes.CUSTOM} or ${IconTypes.MATERIAL_UI}`,
    })
    type: IconTypes;
}
