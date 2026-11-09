// Dados fictícios da sorveteria (projeto acadêmico, sem endereço ou contato reais).
export const site = {
  name: 'ai-ce',
  fullName: 'Sorveteria ai-ce',
  slogan: 'O sorvete mais gelado do litoral',
  address: 'Avenida Beira-Mar, 480 — Jardim das Conchas, Litoral de SP',
  whatsapp: '5500000000000',
  phone: '(00) 00000-0000',
  email: 'contato@sorveteriaaice.exemplo.com',
  instagram: 'https://instagram.com/sorveteria.aice',
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
