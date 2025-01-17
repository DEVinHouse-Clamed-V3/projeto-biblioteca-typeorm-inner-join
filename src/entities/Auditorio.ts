import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

// aqui estou criando a entidadeas de auditorios colunas de informacoes

@Entity("auditoriums")
class Auditorium {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  capacity: number;

  @Column()
  location: string;

  @Column({ default: false })
  has_projector: boolean;

  @Column({ default: false })
  has_sound_system: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Auditorium;
