export class Customer {
  id?: number;
  cpf: string;
  name: string;
  birth_date: Date;

  constructor(customer?: Partial<Customer>) {
    this.id = customer.id;
    this.cpf = customer.cpf;
    this.name = customer.name;
  }
}
