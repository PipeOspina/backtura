import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    color: string;

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
