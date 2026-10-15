import type { Category, Flavor } from '../types';

// Lista provisória. Trocar pela "Lista Real" (card 16 do Trello).
export const flavors: Flavor[] = [
  { id: '1', name: 'Baunilha com Calda', description: 'Baunilha cremosa com calda de chocolate e granulado colorido.', price: 12.9, category: 'sorvetes', imageUrl: '', available: true, highlight: true },
  { id: '2', name: 'Chocolate Belga', description: 'Chocolate intenso, feito com cacau 50%.', price: 13.9, category: 'sorvetes', imageUrl: '', available: true, highlight: true },
  { id: '3', name: 'Morango Silvestre', description: 'Sorvete de morango com pedaços da fruta.', price: 12.9, category: 'sorvetes', imageUrl: '', available: true, highlight: false },
  { id: '4', name: 'Pistache', description: 'Pistache de verdade, levemente salgado.', price: 16.9, category: 'sorvetes', imageUrl: '', available: true, highlight: false, isNew: true },
  { id: '5', name: 'Casquinha Clássica', description: 'Uma bola na casquinha waffle crocante.', price: 8.5, category: 'casquinhas', imageUrl: '', available: true, highlight: true },
  { id: '6', name: 'Casquinha Dupla', description: 'Duas bolas à sua escolha na casquinha waffle.', price: 13.5, category: 'casquinhas', imageUrl: '', available: true, highlight: false, promo: true },
  { id: '7', name: 'Picolé de Limão', description: 'Refrescante, perfeito para a praia.', price: 6.0, category: 'picoles', imageUrl: '', available: true, highlight: false },
  { id: '8', name: 'Picolé de Coco', description: 'Coco cremoso com pedacinhos.', price: 6.5, category: 'picoles', imageUrl: '', available: true, highlight: false },
  { id: '9', name: 'Açaí 300 ml', description: 'Açaí com banana, granola e leite condensado.', price: 18.0, category: 'acai', imageUrl: '', available: true, highlight: true, promo: true },
  { id: '10', name: 'Açaí 500 ml', description: 'Açaí com 3 acompanhamentos à escolha.', price: 25.0, category: 'acai', imageUrl: '', available: true, highlight: false },
  { id: '11', name: 'Milkshake de Ovomaltine', description: 'Milkshake cremoso com crocante de Ovomaltine.', price: 19.9, category: 'milkshakes', imageUrl: '', available: true, highlight: false, isNew: true },
  { id: '12', name: 'Milkshake de Morango', description: 'Batido com sorvete de morango e chantilly.', price: 18.9, category: 'milkshakes', imageUrl: '', available: false, highlight: false },
];

export const categories: { id: Category | 'todos'; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'sorvetes', label: 'Sorvetes' },
  { id: 'casquinhas', label: 'Casquinhas' },
  { id: 'picoles', label: 'Picolés' },
  { id: 'acai', label: 'Açaí' },
  { id: 'milkshakes', label: 'Milkshakes' },
];

// Enquanto não há fotos, cada categoria tem um emoji e uma cor de fundo.
export const categoryVisual: Record<Category, { emoji: string; bg: string }> = {
  sorvetes: { emoji: '🍨', bg: 'linear-gradient(135deg, #3a1d45, #5a2370)' },
  casquinhas: { emoji: '🍦', bg: 'linear-gradient(135deg, #4a2a18, #7a3f14)' },
  picoles: { emoji: '🍡', bg: 'linear-gradient(135deg, #18334a, #1d5470)' },
  acai: { emoji: '🫐', bg: 'linear-gradient(135deg, #2a1745, #4b1d75)' },
  milkshakes: { emoji: '🥤', bg: 'linear-gradient(135deg, #4a1830, #7a1d4a)' },
};
