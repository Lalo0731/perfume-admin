import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Perfume } from 'src/perfumes/entities/perfume.entity';

@Entity('perfumes_special_for')
export class PerfumesSpecialFor {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ length: 100 })
    context: string; 
  
    @ManyToOne(() => Perfume, (perfume) => perfume.specialFor, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'perfume_id' })
    perfume: Perfume;
}

