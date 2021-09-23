import { IsOptional, IsString } from 'class-validator';

export class CreateCategory {
    @IsString()
    name: string;

    @IsString()
    color: string;

    @IsOptional()
    @IsString()
    description?: string;
}
