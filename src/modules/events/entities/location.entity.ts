import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('locations')
export class Location {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 8,
        transformer: {
            from: (d) => (isNaN(parseFloat(d)) ? null : parseFloat(d)),
            to: (d) => d,
        },
    })
    latitude: number;

    @Column({
        type: 'decimal',
        precision: 11,
        scale: 8,
        transformer: {
            from: (d) => (isNaN(parseFloat(d)) ? null : parseFloat(d)),
            to: (d) => d,
        },
    })
    longitude: number;

    @Column()
    address: string;

    @Column()
    country: string;

    @Column()
    city: string;

    @Column({ nullable: true })
    specs?: string;
}
