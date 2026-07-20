/**
 * Capitaliza a primeira letra de cada palavra
 * Exemplo: "joão silva santos" -> "João Silva Santos"
 */
export function capitalizarPalavras(texto: string): string {
  return texto
    .trim()
    .split(" ")
    .map((palavra) => palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Formata o telefone para o padrão brasileiro
 * Exemplo: "11987654321" -> "(11) 98765-4321"
 * Exemplo: "1133334444" -> "(11) 3333-4444"
 */
export function formatarTelefone(telefone: string): string {
  const apenasNumeros = telefone.replace(/\D/g, "");

  if (apenasNumeros.length === 10) {
    return apenasNumeros.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  } else if (apenasNumeros.length === 11) {
    return apenasNumeros.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  } else {
    throw new Error("Telefone deve conter 10 ou 11 dígitos.");
  }
}

/**
 * Valida o formato do email
 * Exemplo: "joao@example.com" -> true
 * Exemplo: "email_invalido" -> false
 */
export function validarEmail(email: string): boolean {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexEmail.test(email);
}
