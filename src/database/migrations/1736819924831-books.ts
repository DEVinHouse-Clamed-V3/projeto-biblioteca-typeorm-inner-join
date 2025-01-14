import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Books1736819924831 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "books",
                columns: [
                    {
                        name: "id",
                        type: "serial", // Usando SERIAL para auto incremento
                        isPrimary: true, // Isso garante que seja a chave primária

                    },
                    {
                        name: "title",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "description",
                        type: "text",
                        isNullable: false,
                    },
                    {
                        name: "publication_date",
                        type: "date",
                        isNullable: true,
                    },
                    {
                        name: "isbn",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "page_count",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "language",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                        isNullable: false,
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                        isNullable: false,
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("books");
    }
}
