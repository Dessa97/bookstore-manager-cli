export interface ILivro {
  id?: number;
  titulo: string;
  isbn: string;
  ano_publicacao: number;
  quantidade_total: number;
  quantidade_disponivel: number;
  autor_id: number;
}
