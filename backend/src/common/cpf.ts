export const sanitizeCpf = (value: string) => value.replace(/\D/g, '');

// Mesma lógica de frontend/src/utils/format.ts, para o backend não confiar no CPF que vem do cliente.
export function isValidCpf(value: string): boolean {
  const cpf = sanitizeCpf(value);
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  const calc = (len: number) => {
    let sum = 0;
    for (let i = 0; i < len; i++) sum += Number(cpf[i]) * (len + 1 - i);
    const r = (sum * 10) % 11;
    return r === 10 ? 0 : r;
  };
  return calc(9) === Number(cpf[9]) && calc(10) === Number(cpf[10]);
}

export const formatCpf = (value: string) =>
  sanitizeCpf(value).replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
