function calculaDigitoVerificador(cpfParcial) {
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

function ehSequencia(cpf) {
  return cpf[0].repeat(cpf.length) === cpf;
}

/**
 * Valida o CPF
 * @param {Number} cpf - CPF
 * @returns {Boolean} CPF válido ou não
 */
function validaCPF(cpf) {
  if (typeof cpf === 'undefined') return false;
  if (cpf.length !== 11) return false;
  if (ehSequencia(cpf)) return false;

  const cpfParcial = cpf.slice(0, -2);
  const digVerificador1 = calculaDigitoVerificador(cpfParcial);
  const digVerificador2 = calculaDigitoVerificador(cpfParcial + digVerificador1);

  const novoCpf = cpfParcial + digVerificador1 + digVerificador2;
  return (cpf === novoCpf);
}

module.exports = validaCPF;
