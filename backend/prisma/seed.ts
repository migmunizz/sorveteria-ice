import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Mesmos produtos de frontend/src/mocks/flavors.ts, com os mesmos ids,
// para carrinhos já salvos no navegador continuarem funcionando.
const flavors = [
  { id: '1', name: 'Baunilha com Calda', description: 'Baunilha cremosa com calda de chocolate e granulado colorido.', price: 12.9, category: 'sorvetes', imageUrl: '', available: true, highlight: true, isNew: false, promo: false },
  { id: '2', name: 'Chocolate Belga', description: 'Chocolate intenso, feito com cacau 50%.', price: 13.9, category: 'sorvetes', imageUrl: '', available: true, highlight: true, isNew: false, promo: false },
  { id: '3', name: 'Morango Silvestre', description: 'Sorvete de morango com pedaços da fruta.', price: 12.9, category: 'sorvetes', imageUrl: '', available: true, highlight: false, isNew: false, promo: false },
  { id: '4', name: 'Pistache', description: 'Pistache de verdade, levemente salgado.', price: 16.9, category: 'sorvetes', imageUrl: '', available: true, highlight: false, isNew: true, promo: false },
  { id: '5', name: 'Casquinha Clássica', description: 'Uma bola na casquinha waffle crocante.', price: 8.5, category: 'casquinhas', imageUrl: '', available: true, highlight: true, isNew: false, promo: false },
  { id: '6', name: 'Casquinha Dupla', description: 'Duas bolas à sua escolha na casquinha waffle.', price: 13.5, category: 'casquinhas', imageUrl: '', available: true, highlight: false, isNew: false, promo: true },
  { id: '7', name: 'Picolé de Limão', description: 'Refrescante, perfeito para a praia.', price: 6.0, category: 'picoles', imageUrl: '', available: true, highlight: false, isNew: false, promo: false },
  { id: '8', name: 'Picolé de Coco', description: 'Coco cremoso com pedacinhos.', price: 6.5, category: 'picoles', imageUrl: '', available: true, highlight: false, isNew: false, promo: false },
  { id: '9', name: 'Açaí 300 ml', description: 'Açaí com banana, granola e leite condensado.', price: 18.0, category: 'acai', imageUrl: '', available: true, highlight: true, isNew: false, promo: true },
  { id: '10', name: 'Açaí 500 ml', description: 'Açaí com 3 acompanhamentos à escolha.', price: 25.0, category: 'acai', imageUrl: '', available: true, highlight: false, isNew: false, promo: false },
  { id: '11', name: 'Milkshake de Ovomaltine', description: 'Milkshake cremoso com crocante de Ovomaltine.', price: 19.9, category: 'milkshakes', imageUrl: '', available: true, highlight: false, isNew: true, promo: false },
  { id: '12', name: 'Milkshake de Morango', description: 'Batido com sorvete de morango e chantilly.', price: 18.9, category: 'milkshakes', imageUrl: '', available: false, highlight: false, isNew: false, promo: false },
] as const;

async function main() {
  for (const flavor of flavors) {
    await prisma.product.upsert({
      where: { id: flavor.id },
      create: flavor,
      update: flavor,
    });
  }
  console.log(`Cardápio populado: ${flavors.length} produtos.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
