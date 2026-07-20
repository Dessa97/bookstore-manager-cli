import { db } from "../database/connection";
export class RelatorioRepository {
  public async listarLivrosDisponiveis() {
    const sql = `
SELECT
    titulo,
    quantidade_disponivel
FROM livros
WHERE quantidade_disponivel > 0
ORDER BY titulo;
`;

    const result = await db.query(sql);

    return result.rows;
  }
  public async listarLivrosEmprestados() {
    const sql = `
SELECT
    a.livro_id, a.data_emprestimo, b.titulo, c. nome_autor, d.nome_cliente
	FROM emprestimos AS a, livros AS b, autores AS c, clientes AS d
	WHERE devolvido = false
`;

    const result = await db.query(sql);

    return result.rows;
  }

  public async livrosCadastradosPorAutor() {
    const sql = `SELECT
    a.nome_autor AS autor,
    b.titulo, b.id AS livro
FROM autores a
INNER JOIN livros b
    ON a.id = b.autor_id
ORDER BY b.id, a.nome_autor, b.titulo;`;
    const result = await db.query(sql);
    return result.rows;
  }
  public async quantidadeEmprestimosPorLivro() {
    const sql = `
    SELECT
    titulo,
    quantidade_total,
    quantidade_disponivel,
    (quantidade_total - quantidade_disponivel) AS quantidade_emprestada
FROM livros;`;
    const result = await db.query(sql);
    return result.rows;
  }
  public async clientesComEmprestimosAtivos() {
    const sql = `
    SELECT
    a.nome_cliente AS cliente,
    b.titulo AS livro,
    c.data_emprestimo
FROM clientes a
INNER JOIN emprestimos c
    ON a.id = c.cliente_id
INNER JOIN livros b
    ON b.id = c.livro_id
WHERE c.devolvido = false
ORDER BY a.nome_cliente;`;
    const result = await db.query(sql);
    return result.rows;
  }
}
