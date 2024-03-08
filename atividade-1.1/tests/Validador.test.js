const Validador = require('../05/Validador');

test('nome valido', () => {
  expect(Validador.validaNome('Andre')).toBe(true);
});

test('nome invalido', () => {
  expect(() => Validador.validaNome('An')).toThrow('nome deve ter ao menos 5 caracteres');
});

test('cpf valido', () => {
  expect(Validador.validaCPF('12345678910')).toBe(true);
});

test('deve lancar erro cpf que nao tem 11 digitos', () => {
  expect(() => Validador.validaCPF('123')).toThrow('cpf deve ter 11 digitos');
  expect(() => Validador.validaCPF('123456789101')).toThrow('cpf deve ter 11 digitos');
});

test('deve lancar erro cpf nao numerico', () => {
  expect(() => Validador.validaCPF('a2345678910')).toThrow('cpf deve ter valores numericos apenas')
})

test('aplica mascara cpf', () => {
  expect(Validador.aplicaMascaraCpf('12345678910')).toBe('123.456.789-10');
});

test('data valida', () => {
  expect(Validador.validaData('06/03/2024')).toBe(true);
  expect(Validador.validaData('29/02/2024')).toBe(true);
  expect(Validador.validaData('31/12/9999')).toBe(true);
})

test('deve lancar erro quando data não está no formato correto', () => {
  const msg = 'data deve estar no formato DD/MM/AAAA'
  expect(() => Validador.validaData('data')).toThrow(msg);
  expect(() => Validador.validaData('100/01/1')).toThrow(msg);
  expect(() => Validador.validaData('12/12/12')).toThrow(msg);
  expect(() => Validador.validaData('1/12/2024')).toThrow(msg);
  expect(() => Validador.validaData('12/1/2024')).toThrow(msg);
  expect(() => Validador.validaData('di/me/anoo')).toThrow(msg);
})

test('deve lancar erro quando data esta no formato correto mas é inválida', () => {
  expect(() => Validador.validaData('12/31/2024')).toThrow('data inválida');
  expect(() => Validador.validaData('32/01/2024')).toThrow('data inválida');
  expect(() => Validador.validaData('29/02/2025')).toThrow('data inválida');
  expect(() => Validador.validaData('00/00/0000')).toThrow('data inválida');
});

test('é maior de idade', () => {
  const dataNasc = new Date(2001, 0, 1);
  const dataAtual = new Date(2024, 2, 6);
  expect(Validador.ehMaiorDeIdade(dataNasc, dataAtual)).toBe(true);
});

test('é maior de idade no dia do aniversário de 18 anos', () => {
  const dataNasc = new Date(2006, 2, 6);
  const dataAtual = new Date(2024, 2, 6);
  expect(Validador.ehMaiorDeIdade(dataNasc, dataAtual)).toBe(true);
});

test('é menor de idade', () => {
  const dataNasc = new Date(2014, 11, 31);
  const dataAtual = new Date(2024, 2, 6);
  expect(Validador.ehMaiorDeIdade(dataNasc, dataAtual)).toBe(false);
});

test('é menor de idade por diferença de um dia', () => {
  const dataNasc = new Date(2006, 2, 8);
  const dataAtual = new Date(2024, 2, 6);
  expect(Validador.ehMaiorDeIdade(dataNasc, dataAtual)).toBe(false);
});

test('estado civil C', () => {
  expect(Validador.validaEstadoCivil('C')).toBe(true);
  expect(Validador.validaEstadoCivil('c')).toBe(true);
});

test('estado civil S', () => {
  expect(Validador.validaEstadoCivil('S')).toBe(true);
  expect(Validador.validaEstadoCivil('s')).toBe(true);
});

test('estado civil V', () => {
  expect(Validador.validaEstadoCivil('V')).toBe(true);
  expect(Validador.validaEstadoCivil('v')).toBe(true);
});

test('estado civil D', () => {
  expect(Validador.validaEstadoCivil('D')).toBe(true);
  expect(Validador.validaEstadoCivil('d')).toBe(true);
});

test('estado civil inválido', () => {
  const msg = 'estado civil inválido';
  expect(() => Validador.validaEstadoCivil('')).toThrow(msg);
  expect(() => Validador.validaEstadoCivil('A')).toThrow(msg);
  expect(() => Validador.validaEstadoCivil('Casado')).toThrow(msg);
  expect(() => Validador.validaEstadoCivil('divorciado')).toThrow(msg);
});

test('dependentes válido', () => {
  expect(Validador.validaDependentes('0')).toBe(true);
  expect(Validador.validaDependentes('1')).toBe(true);
  expect(Validador.validaDependentes('2')).toBe(true);
  expect(Validador.validaDependentes('3')).toBe(true);
  expect(Validador.validaDependentes('10')).toBe(true);
});

test('dependentes inválido', () => {
  const msg = 'número dependentes deve estar entre 0 e 10';
  expect(() => Validador.validaDependentes('-1')).toThrow(msg);
  expect(() => Validador.validaDependentes('11')).toThrow(msg);
});

test('dependentes nao numerico', () => {
  const msg = 'número dependentes deve ser valor numérico';
  expect(() => Validador.validaDependentes('oi')).toThrow(msg);
});

test('converte renda válida', () => {
  expect(Validador.converteStringEmRenda('123,45')).toBe(123.45);
  expect(Validador.converteStringEmRenda('123456,78')).toBe(123456.78);
  expect(Validador.converteStringEmRenda('1,00')).toBe(1.0);
});

test('lança erro renda invalida', () => {
  const msg = 'renda deve seguir o padrão 0,00';
  expect(() => Validador.converteStringEmRenda('-0,01')).toThrow(msg);
  expect(() => Validador.converteStringEmRenda('oi')).toThrow(msg);
  expect(() => Validador.converteStringEmRenda('123.45')).toThrow(msg);
  expect(() => Validador.converteStringEmRenda('0,0')).toThrow(msg);
  expect(() => Validador.converteStringEmRenda('0,00,0')).toThrow(msg);
});