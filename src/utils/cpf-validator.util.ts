export class CPFValidator {
  validate(cpf: string) {
    cpf = cpf.replace(/\D/g, '');
    let cpfNumbers = cpf.slice(0, 9);
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      return false;
    }
    cpfNumbers += this.calculateCheckDigit(cpfNumbers);
    cpfNumbers += this.calculateCheckDigit(cpfNumbers);
    return cpfNumbers === cpf;
  }

  private calculateCheckDigit(cpfNumbers: string) {
    let base = 2;
    let sum = 0;

    for (let cont = cpfNumbers.length - 1; cont >= 0; cont--) {
      sum += parseInt(cpfNumbers[cont]) * base;
      base++;
    }

    const rest = sum % 11;
    const checkDigit = rest < 2 ? 0 : 11 - rest;
    return checkDigit;
  }
}
