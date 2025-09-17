import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Perfume } from 'src/perfumes/entities/perfume.entity';

@Entity('perfumes_images')
export class PerfumesImage {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    image_url: string;
  
    @ManyToOne(() => Perfume, (perfume) => perfume.images, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'perfume_id' })
    perfume: Perfume;
}
