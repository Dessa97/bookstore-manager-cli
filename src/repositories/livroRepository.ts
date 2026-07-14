import { db } from "../database/connection";
import { Livro } from "../models/livro";

export class LivroRepository {
  public async listarLivros(): Promise<Livro[]> {
    const sql = `
        SELECT *
        FROM livros
        ORDER BY titulo;
    `;

    const result = await db.query(sql);

    return result.rows.map(
      (row) => new Livro(row.titulo, row.ano_publicacao, row.quantidade_total, row.quantidade_disponivel, row.autor_id, row.id),
    );
  }

  public async cadastrarLivro(livro: Livro): Promise<void> {
    const sql = `
            INSERT INTO livros (titulo, ano_publicacao, quantidade_total, quantidade_disponivel, autor_id)
            VALUES ($1, $2, $3, $4, $5)
        `;

    await db.query(sql, [livro.titulo, livro.ano_publicacao, livro.quantidade_total, livro.quantidade_disponivel, livro.autor_id]);
  }

  public async buscarLivroPorId(id: number): Promise<Livro | null> {
    const sql = `
        SELECT *
        FROM livros
        WHERE id = $1;
    `;

    const result = await db.query(sql, [id]);

    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];

    return new Livro(row.titulo, row.ano_publicacao, row.quantidade_total, row.quantidade_disponivel, row.autor_id, row.id);
  }

  public async atualizarLivro(livro: Livro): Promise<void> {
    const sql = `
        UPDATE livros
        SET
            titulo = $1,
        autor_id = $2,
        ano_publicacao = $3,
        quantidade_total = $4,
        quantidade_disponivel = $5
      WHERE id = $6;
    `;

    await db.query(sql, [livro.titulo, livro.autor_id, livro.ano_publicacao, livro.quantidade_total, livro.quantidade_disponivel, livro.id]);
  }

  public async excluirLivro(id: number): Promise<void> {
    const sql = `
        DELETE
        FROM livros
        WHERE id = $1;
    `;

    await db.query(sql, [id]);
  }
}
