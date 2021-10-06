import { IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IconTypes } from '../enums/icon.enums';

export class CreateIconBody {
    @ApiProperty({ type: String })
    @IsString()
    name: string;

    @ApiProperty({ enum: IconTypes })
    @IsEnum(IconTypes, {
        message: `type must be ${IconTypes.CUSTOM} or ${IconTypes.MATERIAL_UI}`,
    })
    type: IconTypes;
}
