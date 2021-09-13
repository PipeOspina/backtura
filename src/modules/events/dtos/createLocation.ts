import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateLocationBody {
    @IsNumber()
    latitude: number;

    @IsNumber()
    longitude: number;

    @IsString()
    address: string;

    @IsString()
    country: string;

    @IsString()
    city: string;

    @IsOptional()
    @IsString()
    specs?: string;
}
