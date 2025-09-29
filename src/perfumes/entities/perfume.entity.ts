import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { PerfumesImage } from "src/perfumes_images/entities/perfumes_image.entity";
import { PerfumesAccord } from "src/perfumes_accords/entities/perfumes_accord.entity";
import { PerfumesSpecialFor } from "src/perfumes_special_for/entities/perfumes_special_for.entity";

@Entity('perfumes')
export class Perfume {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('text')
    description: string;

    @Column({ type: 'enum', enum: ['arabe', 'diseñador', 'next']})
    category: 'arabe' | 'diseñador' | 'next';

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    oldPrice: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @Column({ default: false })
    isDecantOnly: boolean;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    priceDecant: number;

    @Column({ default: false })
    isDecant: boolean;

    @Column({ default: false })
    isNew: boolean;

    @Column({ default: true })
    available: boolean;

    @OneToMany(() => PerfumesImage, (image) => image.perfume, { cascade: true, onDelete: 'CASCADE' })
    images: PerfumesImage[];
  
    @OneToMany(() => PerfumesAccord, (accord) => accord.perfume, { cascade: true, eager: true, orphanedRowAction: 'delete', onDelete: 'CASCADE' })
    accords: PerfumesAccord[];
  
    @OneToMany(() => PerfumesSpecialFor, (specialFor) => specialFor.perfume, { cascade: true, eager: true, orphanedRowAction: 'delete', onDelete: 'CASCADE' })
    specialFor: PerfumesSpecialFor[];
}
