import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateLocationBody {
    @IsNumber()
    @ApiProperty({ type: Number })
    latitude: number;

    @IsNumber()
    @ApiProperty({ type: Number })
    longitude: number;

    @IsString()
    @ApiProperty({ type: String })
    address: string;

    @IsString()
    @ApiProperty({ type: String })
    country: string;

    @IsString()
    @ApiProperty({ type: String })
    city: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ type: String, nullable: true })
    specs?: string;
}
