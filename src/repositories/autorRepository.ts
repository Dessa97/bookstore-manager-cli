import { db } from "../database/connection";
import { Autor } from "../models/autor";

export class AutorRepository {
  public async listarAutores(): Promise<Autor[]> {
    const sql = `
        SELECT *
        FROM autores
        ORDER BY nome;
    `;

    const result = await db.query(sql);

    return result.rows.map(
      (row) => new Autor(row.nome, row.nacionalidade, row.id),
    );
  }

  public async cadastrarAutor(autor: Autor): Promise<void> {
    const sql = `
            INSERT INTO autores (nome, nacionalidade)
            VALUES ($1, $2)
        `;

    await db.query(sql, [autor.nome, autor.nacionalidade]);
  }

  public async buscarAutorPorId(id: number): Promise<Autor | null> {
    const sql = `
        SELECT *
        FROM autores
        WHERE id = $1;
    `;

    const result = await db.query(sql, [id]);

    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];

    return new Autor(row.nome, row.nacionalidade, row.id);
  }

  public async atualizarAutor(autor: Autor): Promise<void> {
    const sql = `
        UPDATE autores
        SET
            nome = $1,
            nacionalidade = $2
        WHERE id = $3;
    `;

    await db.query(sql, [autor.nome, autor.nacionalidade, autor.id]);
  }

  public async excluirAutor(id: number): Promise<void> {
    const sql = `
        DELETE
        FROM autores
        WHERE id = $1;
    `;

    await db.query(sql, [id]);
  }
}
