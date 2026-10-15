import type { Flavor } from '../types';
import { flavors as mockFlavors } from '../mocks/flavors';
import { api, delay, USE_MOCK, ApiError } from './api';

export async function getFlavors(): Promise<Flavor[]> {
  if (USE_MOCK) {
    await delay();
    return mockFlavors;
  }
  return api<Flavor[]>('/cardapio');
}

export async function getFlavor(id: string): Promise<Flavor> {
  if (USE_MOCK) {
    await delay(250);
    const f = mockFlavors.find((x) => x.id === id);
    if (!f) throw new ApiError(404, 'Produto não encontrado');
    return f;
  }
  return api<Flavor>(`/produto/${id}`);
}
