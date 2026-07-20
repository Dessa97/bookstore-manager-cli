import { db } from "../database/connection";
import { Autor } from "../models/autor";

export class AutorRepository {
  public async listarAutores(): Promise<Autor[]> {
    const sql = `
        SELECT *
        FROM autores
        ORDER BY nome_autor;
    `;

    const result = await db.query(sql);

    return result.rows.map(
      (row) => new Autor(row.nome_autor, row.nacionalidade, row.id),
    );
  }

  public async cadastrarAutor(autor: Autor): Promise<void> {
    const sql = `
            INSERT INTO autores (nome_autor, nacionalidade)
            VALUES ($1, $2)
        `;

    await db.query(sql, [autor.nome_autor, autor.nacionalidade]);
  }

  public async buscarAutorPorNomeENacionalidade(nome_autor: string, nacionalidade: string): Promise<Autor | null> {
    const sql = `
        SELECT *
        FROM autores
        WHERE nome_autor = $1 AND nacionalidade = $2;
    `;

    const result = await db.query(sql, [nome_autor, nacionalidade]);

    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];

    return new Autor(row.nome_autor, row.nacionalidade, row.id);
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

    return new Autor(row.nome_autor, row.nacionalidade, row.id);
  }

  public async atualizarAutor(autor: Autor): Promise<void> {
    const sql = `
        UPDATE autores
        SET
            nome_autor = $1,
            nacionalidade = $2
        WHERE id = $3;
    `;

    await db.query(sql, [autor.nome_autor, autor.nacionalidade, autor.id]);
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
