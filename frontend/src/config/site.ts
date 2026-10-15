// Dados da sorveteria. Itens com "PENDENTE" ainda precisam ser preenchidos (Design System §12).
export const site = {
  name: 'ai-ce',
  fullName: 'Sorveteria ai-ce',
  slogan: 'O sorvete mais gelado do litoral',
  address: 'PENDENTE — Litoral de SP (raio de entrega de 10 km)',
  whatsapp: '5513999999999', // PENDENTE
  phone: '(13) 99999-9999', // PENDENTE
  email: 'contato@ai-ce.com.br', // PENDENTE
  instagram: 'https://instagram.com/', // PENDENTE
  deliveryRadiusKm: 10,
  deliveryFee: 6,
  // 0 = domingo ... 6 = sábado. Horas no formato 24h.
  hours: [
    { days: [2, 3, 4, 5], open: 12, close: 22, label: 'Ter a Sex: 12h às 22h' },
    { days: [6, 0], open: 11, close: 23, label: 'Sáb e Dom: 11h às 23h' },
  ],
  closedLabel: 'Segunda: fechado',
};

export function isOpenNow(date = new Date()): boolean {
  const day = date.getDay();
  const hour = date.getHours() + date.getMinutes() / 60;
  return site.hours.some((h) => h.days.includes(day) && hour >= h.open && hour < h.close);
}
