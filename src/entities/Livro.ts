
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity("books") // Nome da tabela no banco
export class Livro {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", nullable: false })
    title: string;

    @Column({ type: "text", nullable: false })
    description: string;

    @Column({ type: "date", nullable: true })
    publication_date: Date;

    @Column({ type: "varchar", nullable: false })
    isbn: string;

    @Column({ type: "int", default: false })
    page_count: number;

    @Column({ type: "varchar", default: false })
    language: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}