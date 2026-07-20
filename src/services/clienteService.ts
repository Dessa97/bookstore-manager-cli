import { ClienteRepository } from "../repositories/clienteRepository";
import { Cliente } from "../models/cliente";
import { capitalizarPalavras, formatarTelefone, validarEmail } from "../utils/stringUtils";

export class ClienteService {
  private clienteRepository = new ClienteRepository();

  private validarDadosCliente(cliente: Cliente): void {
    if (!validarEmail(cliente.email)) {
      throw new Error("Email inválido. Formato esperado: usuario@dominio.com");
    }

    if (cliente.nome === cliente.telefone) {
      throw new Error("O nome e o telefone não podem ser iguais.");
    }

    if (cliente.nome === cliente.email) {
      throw new Error("O nome e o email não podem ser iguais.");
    }

    if (cliente.nome === cliente.telefone && cliente.nome === cliente.email) {
      throw new Error("O nome, telefone e email não podem ser iguais.");
    }
  }

  public async cadastrarCliente(cliente: Cliente): Promise<void> {
    if (!cliente.nome.trim()) {
      throw new Error("O nome do cliente é obrigatório.");
    }

    cliente.nome = capitalizarPalavras(cliente.nome);
    cliente.email = cliente.email.toLowerCase();
    cliente.telefone = formatarTelefone(cliente.telefone);

    this.validarDadosCliente(cliente);

    const clienteComEmail = await this.clienteRepository.buscarClientePorEmail(
      cliente.email,
    );

    if (clienteComEmail) {
      throw new Error("Já existe um cliente cadastrado com este email.");
    }

    await this.clienteRepository.cadastrarCliente(cliente);
  }

  public async listarClientes(): Promise<Cliente[]> {
    return await this.clienteRepository.listarClientes();
  }

  public async buscarClientePorId(id: number): Promise<Cliente | null> {
    return await this.clienteRepository.buscarClientePorId(id);
  }
  public async atualizarCliente(cliente: Cliente): Promise<void> {
    const clienteExistente = await this.clienteRepository.buscarClientePorId(
      cliente.id!,
    );

    if (!clienteExistente) {
      throw new Error("Cliente não encontrado.");
    }

    if (!cliente.nome.trim()) {
      throw new Error("O nome do cliente é obrigatório.");
    }

    cliente.nome = capitalizarPalavras(cliente.nome);
    cliente.email = cliente.email.toLowerCase();
    cliente.telefone = formatarTelefone(cliente.telefone);

    this.validarDadosCliente(cliente);

    if (clienteExistente.email !== cliente.email) {
      const clienteComEmail = await this.clienteRepository.buscarClientePorEmail(
        cliente.email,
      );

      if (clienteComEmail) {
        throw new Error("Já existe um cliente cadastrado com este email.");
      }
    }

    await this.clienteRepository.atualizarCliente(cliente);
  }

  public async excluirCliente(id: number): Promise<void> {
    const cliente = await this.clienteRepository.buscarClientePorId(id);

    if (!cliente) {
      throw new Error("Cliente não encontrado.");
    }

    await this.clienteRepository.excluirCliente(id);
  }
}
