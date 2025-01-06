import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";
  
  @Entity("autores") // Nome da tabela no banco
  export class Autor {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: "varchar", nullable: false })
    name: string;
  
    @Column({ type: "date", nullable: false })
    birthdate: Date;
  
    @Column({ type: "text", nullable: true })
    biography: string;
  
    @Column({ type: "varchar", nullable: false })
    nationality: string;
  
    @Column({ type: "boolean", default: true })
    active: boolean;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }