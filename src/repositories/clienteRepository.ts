import { db } from "../database/connection";
import { Cliente } from "../models/cliente";

export class ClienteRepository {
  public async listarClientes(): Promise<Cliente[]> {
    const sql = `
        SELECT *
        FROM clientes
        ORDER BY nome_cliente;
    `;

    const result = await db.query(sql);

    return result.rows.map(
      (row) => new Cliente(row.nome_cliente, row.email, row.telefone, row.id),
    );
  }

  public async cadastrarCliente(cliente: Cliente): Promise<void> {
    const sql = `
            INSERT INTO clientes (nome_cliente, email, telefone)
            VALUES ($1, $2, $3)
        `;

    await db.query(sql, [cliente.nome_cliente, cliente.email, cliente.telefone]);
  }

  public async buscarClientePorId(id: number): Promise<Cliente | null> {
    const sql = `
        SELECT *
        FROM clientes
        WHERE id = $1;
    `;

    const result = await db.query(sql, [id]);

    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];

    return new Cliente(row.nome_cliente, row.email, row.telefone, row.id);
  }

  public async buscarClientePorEmail(email: string): Promise<Cliente | null> {
    const sql = `
        SELECT *
        FROM clientes
        WHERE email = $1;
    `;

    const result = await db.query(sql, [email]);

    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];

    return new Cliente(row.nome_cliente, row.email, row.telefone, row.id);
  }

  public async atualizarCliente(cliente: Cliente): Promise<void> {
    const sql = `
        UPDATE clientes
        SET
            nome_cliente = $1,
            email = $2,
            telefone = $3
        WHERE id = $4;
    `;

    await db.query(sql, [cliente.nome_cliente, cliente.email, cliente.telefone, cliente.id]);
  }

  public async excluirCliente(id: number): Promise<void> {
    const sql = `
        DELETE
        FROM clientes
        WHERE id = $1;
    `;

    await db.query(sql, [id]);
  }
}
