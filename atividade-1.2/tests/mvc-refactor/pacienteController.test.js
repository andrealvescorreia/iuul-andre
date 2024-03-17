const pacienteController = require('../../src/controllers/pacienteController');

test('salva paciente', () => {
  const paciente = {
    cpf: '91523518235',
    nome: 'Maria',
    dataNascimento: '10/10/2002',
  };
  const res = {};
  pacienteController.save({ body: paciente }, res);
  expect(res.success).toBe(true);
});

test('não salva paciente nome inválido', () => {
  const paciente = {
    cpf: '91523518235',
    nome: 'Mari',
    dataNascimento: '10/10/2002',
  };

  const res = {};
  pacienteController.save({ body: paciente }, res);
  expect(res.success).toBe(false);
  expect(res.errors).toEqual(['nome deve ter ao menos 5 caracteres']);
});

test('não salva paciente cpf inválido', () => {
  const paciente = {
    cpf: '1234567890',
    nome: 'Maria',
    dataNascimento: '10/10/2002',
  };

  const res = {};
  pacienteController.save({ body: paciente }, res);
  expect(res.success).toBe(false);
  expect(res.errors).toEqual(['cpf inválido']);
});

test('não salva paciente com data nascimento que não segue o formato', () => {
  const paciente = {
    cpf: '91523518235',
    nome: 'Maria',
    dataNascimento: '10102002',
  };

  const res = {};
  pacienteController.save({ body: paciente }, res);
  expect(res.success).toBe(false);
  expect(res.errors).toEqual(['data nascimento não está no formato DD/MM/AAAA']);
});

test('não salva paciente com data nascimento inválida', () => {
  const paciente = {
    cpf: '91523518235',
    nome: 'Maria',
    dataNascimento: '32/13/2002',
  };

  const res = {};
  pacienteController.save({ body: paciente }, res);
  expect(res.success).toBe(false);
  expect(res.errors).toEqual(['data nascimento inválida']);
});
