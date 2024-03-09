module.exports = class ValidadorCPF {
  constructor(cpf) {
    this.cpf = cpf;
  }

  valido() {
    if (typeof this.cpf === 'undefined') return false;
    if (this.cpf.length !== 11) return false;
    if (this.ehSequencia()) return false;

    const cpfParcial = this.cpf.slice(0, -2);
    const digVerificador1 = this.calculaDigitoVerificador(cpfParcial);
    const digVerificador2 = this.calculaDigitoVerificador(cpfParcial + digVerificador1);

    const novoCpf = cpfParcial + digVerificador1 + digVerificador2;
    return (this.cpf === novoCpf);
  }

  calculaDigitoVerificador(cpfParcial) {
    const arrayCpf = Array.from(cpfParcial);
    let regressivo = arrayCpf.length + 1;

    const somaTotal = arrayCpf.reduce((acSoma, digitoAtual) => {
      acSoma += Number(digitoAtual) * regressivo;
      regressivo--;
      return acSoma;
    }, 0);

    const digito = 11 - (somaTotal % 11);
    return digito > 9 ? '0' : String(digito);
  }

  ehSequencia() {
    return this.cpf[0].repeat(this.cpf.length) === this.cpf;
  }
}
