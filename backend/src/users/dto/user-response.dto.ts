import { formatCpf } from '../../common/cpf.js';

interface UserRecord {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
}

export class UserResponseDto {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;

  constructor(user: UserRecord) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.cpf = formatCpf(user.cpf);
    this.phone = user.phone;
  }
}
