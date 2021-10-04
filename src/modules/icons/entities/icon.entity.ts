import { IconTypes } from '../enums/icon.enums';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';

@Entity('icons')
export class Icon {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        type: 'enum',
        enum: IconTypes,
    })
    type: IconTypes;

    @OneToMany(() => Category, ({ id }) => id)
    category: number;
}
