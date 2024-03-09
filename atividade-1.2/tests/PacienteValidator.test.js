const PacienteValidator = require('../src/validators/PacienteValidator');

test('paciente nome valido', () => {
  expect(PacienteValidator.validaNome('Maria')).toBe(true);
  expect(PacienteValidator.validaNome('Jose Almeida')).toBe(true);
});

test('paciente cpf valido', () => {
  expect(PacienteValidator.validaCpf('91523518235')).toBe(true);
  expect(PacienteValidator.validaCpf('77884084848')).toBe(true);
});

test('deve lançar erro paciente cpf com formato inválido', () => {
  expect(() => PacienteValidator.validaCpf('915.235.182-35')).toThrow('cpf deve ter digitos apenas');
  expect(() => PacienteValidator.validaCpf('oi')).toThrow('cpf deve ter digitos apenas');
});

test('deve lançar erro paciente cpf inválido', () => {
  expect(() => PacienteValidator.validaCpf('11111122233')).toThrow('cpf inválido');
  expect(() => PacienteValidator.validaCpf('915235182')).toThrow('cpf inválido');
});

test('deve lançar erro nome com menos de 5 caracteres', () => {
  expect(() => PacienteValidator.validaNome('Jose')).toThrow('nome deve ter ao menos 5 caracteres');
});

test('deve lançar erro data no formato inválido', () => {
  expect(() => PacienteValidator.validaDataNascimento('10102002'))
    .toThrow('data deve estar no formato DD/MM/AAAA');
});

// ! este teste pode ficar defasado com o passar do tempo.
test('deve lançar erro paciente com menos de 13 anos', () => {
  expect(() => PacienteValidator.validaDataNascimento('10/10/2011'))
    .toThrow('O paciente deve ter ao menos 13 anos');
});
