module.exports = class ValidadorCPF {
  constructor(cpfEnviado) {
    this.cpfEnviado = cpfEnviado;
  }

  get cpfLimpo() {
    return this.cpfEnviado.replace(/\D+/g, '');
  }

  valido() {
    if (typeof this.cpfLimpo === 'undefined') return false;
    if (this.cpfLimpo.length !== 11) return false;
    if (this.ehSequencia()) return false;

    const cpfParcial = this.cpfLimpo.slice(0, -2);
    const digVerificador1 = this.calculaDigitoVerificador(cpfParcial);
    const digVerificador2 = this.calculaDigitoVerificador(cpfParcial + digVerificador1);

    const novoCpf = cpfParcial + digVerificador1 + digVerificador2;
    return (this.cpfLimpo === novoCpf);
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
    return this.cpfLimpo[0].repeat(this.cpfLimpo.length) === this.cpfLimpo;
  }
}
