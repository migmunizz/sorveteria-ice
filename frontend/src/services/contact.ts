import { api, delay, USE_MOCK } from './api';

export interface ContactData {
  name: string;
  email: string;
  message: string;
}

export async function sendContact(data: ContactData): Promise<void> {
  if (USE_MOCK) {
    await delay();
    return;
  }
  await api<void>('/contato', { method: 'POST', body: JSON.stringify(data) });
}
