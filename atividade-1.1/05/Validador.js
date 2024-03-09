const ValidadorCPF = require("./ValidadorCPF");

module.exports = class Validador {

  static validaNome(nome) {
    if (nome.length < 5) throw new Error('nome deve ter ao menos 5 caracteres');
    return true;
  }

  static validaCPF(cpf) {
    if (isNaN(Number(cpf))) throw new Error('cpf deve ter valores numericos apenas');
    if (cpf.length != 11) throw new Error('cpf deve ter 11 digitos');
    const cpfValidado = new ValidadorCPF(cpf);
    if (!cpfValidado.valido()) throw new Error('cpf inválido');
    return true;
  }

  static aplicaMascaraCpf(cpf) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
  }

  static converteStringEmData(dataString) {
    const dataReg = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = dataString.match(dataReg);
    if (!match) throw new Error('data deve estar no formato DD/MM/AAAA');

    const dia = parseInt(match[1]);
    const mes = parseInt(match[2]);
    const ano = parseInt(match[3]);

    const data = new Date(ano, mes - 1, dia);
    const dataInvalida = data.getFullYear() != ano
      || data.getMonth() + 1 != mes
      || data.getDate() != dia;
    if (dataInvalida) throw new Error('data inválida');

    return data;
  }

  static validaData(data) {
    this.converteStringEmData(data);
    return true;
  }

  static #diferencaEmAnos(data1, data2) {
    var diferencaEmMilisegundos = data2 - data1.getTime();
    var anosData = new Date(diferencaEmMilisegundos);
    return Math.abs(anosData.getUTCFullYear() - 1970);
  }

  static calculaIdade(dataNascimentoStr, dataAtual = Date.now()) {
    const dataNascimento = Validador.converteStringEmData(dataNascimentoStr);
    return Validador.#diferencaEmAnos(dataNascimento, dataAtual);
  }

  static ehMaiorDeIdade(dataNascimento, dataAtual = Date.now()) {
    const idade = Validador.#diferencaEmAnos(dataNascimento, dataAtual);
    return idade >= 18;
  }

  static validaDataNascimento(dataNascStr) {
    const dataNasc = Validador.converteStringEmData(dataNascStr);
    if (!Validador.ehMaiorDeIdade(dataNasc)) throw new Error('o cliente deve ter 18 anos ou mais')
  }

  static validaEstadoCivil(estadoCivil) {
    const ec = estadoCivil.toLowerCase()
    if (ec == 'c' || ec == 's' || ec == 'v' || ec == 'd') return true;
    throw new Error('estado civil inválido');
  }

  static validaDependentes(dependentesStr) {
    const dependentes = Number(dependentesStr);
    if (isNaN(dependentes))
      throw new TypeError('número dependentes deve ser valor numérico');
    if (dependentes < 0 || dependentes > 10)
      throw new Error('número dependentes deve estar entre 0 e 10');
    return true;
  }

  static converteStringEmRenda(strRenda) {
    const rendaReg = /^[0-9]+\,([0-9]{2})$/;
    if (!strRenda.match(rendaReg)) throw new Error('renda deve seguir o padrão 0,00')
    const renda = Number(strRenda.replace(',', '.'));
    return renda;
  }

  static validaRenda(strRenda) {
    Validador.converteStringEmRenda(strRenda);
    return true;
  }
};
