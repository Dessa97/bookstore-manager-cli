import { db } from "../database/connection";
import {Emprestimo} from "../models/emprestimo";

export class EmprestimoRepository {

    public async cadastrarEmprestimo(emprestimo: Emprestimo): Promise<void> {

        const sql = `
            INSERT INTO emprestimos
            (
                livro_id,
                cliente_id,
                data_emprestimo,
                devolvido
            )
            VALUES ($1,$2,$3,$4)
        `;

        await db.query(sql,[
            emprestimo.livro_id,
            emprestimo.cliente_id,
            emprestimo.data_emprestimo,
            emprestimo.devolvido ?? false
        ]);

    }

    public async listarEmprestimos(): Promise<Emprestimo[]> {

        const sql = `
            SELECT *
            FROM emprestimos
            ORDER BY id;
        `;

        const result = await db.query(sql);

        return result.rows.map(row =>
            new Emprestimo(
                row.livro_id,
                row.cliente_id,
                row.data_emprestimo,
                row.data_devolucao,
                row.devolvido,
                row.id
            )
        );

    }

    public async buscarEmprestimoPorId(id:number):Promise<Emprestimo | null>{

        const sql = `
            SELECT *
            FROM emprestimos
            WHERE id=$1
        `;

        const result = await db.query(sql,[id]);

        if(result.rows.length===0){
            return null;
        }

        const row=result.rows[0];

        return new Emprestimo(
            row.livro_id,
            row.cliente_id,
            row.data_emprestimo,
            row.data_devolucao,
            row.devolvido,
            row.id
        );

    }

    public async devolverEmprestimo(id:number):Promise<void>{

        const sql = `
            UPDATE emprestimos
            SET
                devolvido = true,
                data_devolucao = CURRENT_DATE
            WHERE id = $1
        `;

        await db.query(sql,[id]);

    }

    public async excluirEmprestimo(id:number):Promise<void>{

        const sql = `
            DELETE
            FROM emprestimos
            WHERE id=$1
        `;

        await db.query(sql,[id]);

    }

    public async editarEmprestimo(emprestimo: Emprestimo): Promise<void> {
        const sql = `
            UPDATE emprestimos
            SET
                livro_id = $1,
                cliente_id = $2,
                data_emprestimo = $3,
                data_devolucao = $4,
                devolvido = $5
            WHERE id = $6
        `;

        await db.query(sql, [
            emprestimo.livro_id,
            emprestimo.cliente_id,
            emprestimo.data_emprestimo,
            emprestimo.data_devolucao,
            emprestimo.devolvido,
            emprestimo.id
        ]);
    }

}