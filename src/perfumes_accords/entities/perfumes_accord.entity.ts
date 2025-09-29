import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Perfume } from 'src/perfumes/entities/perfume.entity';
import { Exclude } from 'class-transformer';

@Entity('perfumes_accords')
export class PerfumesAccord {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ length: 100 })
    accord: string;
  
    @ManyToOne(() => Perfume, (perfume) => perfume.accords, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'perfume_id' })
    @Exclude()
    perfume: Perfume;
}
