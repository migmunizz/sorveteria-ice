import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

interface CreateContactData {
  name: string;
  email: string;
  message: string;
}

@Injectable()
export class ContactRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateContactData) {
    return this.prisma.contactMessage.create({ data });
  }
}
