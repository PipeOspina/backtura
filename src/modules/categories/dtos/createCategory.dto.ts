import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryBody {
    @IsString()
    @ApiProperty({ type: String })
    name: string;

    @IsString()
    @ApiProperty({ type: String })
    color: string;

    @IsNumber()
    @ApiProperty({ type: Number })
    icon: number;

    @IsOptional()
    @IsString()
    @ApiProperty({
        type: String,
        nullable: true,
        required: false,
    })
    description?: string;
}
