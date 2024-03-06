const Validador = require('../05/Validador');

const validador = new Validador();

test('nome valido', () => {
  expect(validador.validaNome('Andre')).toBe(true);

});

test('nome invalido', () => {
  expect(() => validador.validaNome('An')).toThrow('nome deve ter ao menos 5 caracteres');
});

test('cpf valido', () => {
  expect(validador.validaCPF('12345678910')).toBe(true);
})

test('deve lancar erro cpf que nao tem 11 digitos', () => {
  expect(() => validador.validaCPF('123')).toThrow('cpf deve ter 11 digitos');

  expect(() => validador.validaCPF('123456789101')).toThrow('cpf deve ter 11 digitos');
});

test('deve lancar erro cpf nao numerico', () => {
  expect(() => validador.validaCPF('a2345678910')).toThrow('cpf deve ter valores numericos apenas')
})

test('data valida', () => {
  expect(validador.validaData('01/01/0001')).toBe(true);
  expect(validador.validaData('06/03/2024')).toBe(true);
  expect(validador.validaData('31/12/9999')).toBe(true);
})

test('data invalida', () => {
  expect(() => validador.validaData('data')).toThrow('data deve estar no formato DD/MM/AAAA');

  expect(() => validador.validaData('100/01/1')).toThrow('data deve estar no formato DD/MM/AAAA');


  expect(() => validador.validaData('99/99/9999')).toThrow('data deve estar no formato DD/MM/AAAA');


  expect(() => validador.validaData('12/12/12')).toThrow('data deve estar no formato DD/MM/AAAA');
})
