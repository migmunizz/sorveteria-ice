import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ContactService } from './contact.service.js';
import { CreateContactDto } from './dto/create-contact.dto.js';

@Controller()
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @HttpCode(204)
  @Post('contato')
  create(@Body() dto: CreateContactDto) {
    return this.contactService.create(dto);
  }
}
