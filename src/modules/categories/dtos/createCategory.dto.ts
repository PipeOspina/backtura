import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCategory {
    @IsString()
    name: string;

    @IsString()
    color: string;

    @IsNumber()
    icon: number;

    @IsOptional()
    @IsString()
    description?: string;
}
