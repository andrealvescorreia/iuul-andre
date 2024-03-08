const readline = require('readline-sync');
const Validador = require('./Validador');

module.exports = class LeitorCliente {
  dadosCliente = {};

  le(chave, funcaoValidadora, funcaoDeTratamento) {
    let valor = readline.question('\n' + chave + ': ');
    try {
      funcaoValidadora(valor);
      valor = funcaoDeTratamento ? funcaoDeTratamento(valor) : valor;
    } catch (e) {
      console.log(e.message);
      console.log('tente novamente.');
      return this.le(chave, funcaoValidadora, funcaoDeTratamento);
    }
    this.dadosCliente[chave] = valor;
  }

  init() {
    console.log('Insira os dados do cliente.');
    console.log('Ao final do formulário, os dados serão mostrados.');

    this.le('nome', Validador.validaNome);
    this.le('cpf', Validador.validaCPF, Validador.aplicaMascaraCpf);
    this.le('data_nascimento', Validador.validaDataNascimento);
    this.le('renda_mensal', Validador.validaRenda, Validador.converteStringEmRenda);
    this.le(
      'estado_civil',
      Validador.validaEstadoCivil,
      (estadoCivil) => estadoCivil.toUpperCase()
    );
    this.le(
      'dependentes',
      Validador.validaDependentes,
      (dependentes) => Number(dependentes)
    );

    console.log('\nDADOS:');
    console.log(this.dadosCliente);
  }
}