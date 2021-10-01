import { IconTypes } from './../enums/icon.enums';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
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
}

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    color: string;

    @OneToOne(() => Icon)
    @JoinColumn({ name: 'icon_id' })
    icon: Icon;

    @Column({ nullable: true })
    description?: string;

    @CreateDateColumn({
        name: 'created_at',
        type: 'datetime',
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'datetime',
    })
    updatedAt: Date;
}
