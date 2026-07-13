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

    return result.rows;
}

  public async cadastrarAutor(autor: Autor): Promise<void> {
    const sql = `
            INSERT INTO autores (nome, nacionalidade)
            VALUES ($1, $2)
        `;

    await db.query(sql, [autor.nome, autor.nacionalidade]);
  }

  atualizarAutor(): void {
    // Implementação futura
  }

  deletarAutor(): void {
    // Implementação futura
  }
}
