import { Injectable } from '@nestjs/common';
import { ContactRepository } from './contact.repository.js';
import { CreateContactDto } from './dto/create-contact.dto.js';

@Injectable()
export class ContactService {
  constructor(private readonly contactRepository: ContactRepository) {}

  async create(dto: CreateContactDto) {
    await this.contactRepository.create(dto);
  }
}
