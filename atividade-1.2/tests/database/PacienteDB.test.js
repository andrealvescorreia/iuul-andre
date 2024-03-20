const PacienteDBModel = require('../../src/databaseModels/PacienteDBModel');

const pacientes = [
  {
    cpf: '123',
    nome: 'Jose',
    dataNascimento: '10/10/2010',
  },
  {
    cpf: '456',
    nome: 'Maria',
    dataNascimento: '11/11/2011',
  },
  {
    cpf: '789',
    nome: 'Jesus',
    dataNascimento: '12/12/2012',
  },
];

// ! como o banco de dados é estático, todos os testes devem ser executados nessa ordem.
test('create 3 pacientes', () => {
  expect(PacienteDBModel.create(pacientes[0])).toEqual({ ...pacientes[0], id: 1 });
  expect(PacienteDBModel.create(pacientes[1])).toEqual({ ...pacientes[1], id: 2 });
  expect(PacienteDBModel.create(pacientes[2])).toEqual({ ...pacientes[2], id: 3 });
});

// depende do teste 'create 3 pacientes'
test('find', () => {
  expect(PacienteDBModel.find()).toEqual([
    { ...pacientes[0], id: 1 },
    { ...pacientes[1], id: 2 },
    { ...pacientes[2], id: 3 },
  ]);
});

// depende do teste 'create 3 pacientes'
test('findByKey(cpf)', () => {
  expect(PacienteDBModel.findByKey('cpf', '123')).toEqual({ ...pacientes[0], id: 1 });
  expect(PacienteDBModel.findByKey('cpf', '456')).toEqual({ ...pacientes[1], id: 2 });
  expect(PacienteDBModel.findByKey('cpf', '789')).toEqual({ ...pacientes[2], id: 3 });
});

// depende do teste 'create 3 pacientes'
test('cannot findByKey(cpf)', () => {
  expect(PacienteDBModel.findByKey('cpf', '000')).toEqual(null);
});

// depende do teste 'create 3 pacientes'
test('cannot findByKey(cpf)AndDelete', () => {
  expect(PacienteDBModel.findByKey('cpf', '000')).toEqual(null);
  expect(PacienteDBModel.find()).toEqual([
    { ...pacientes[0], id: 1 },
    { ...pacientes[1], id: 2 },
    { ...pacientes[2], id: 3 },
  ]);
});

// depende do teste 'create 3 pacientes'
test('findByKey(cpf)AndDelete', () => {
  expect(PacienteDBModel.findByKeyAndDelete('cpf', '123')).toEqual({ ...pacientes[0], id: 1 });
  expect(PacienteDBModel.find()).toEqual([
    { ...pacientes[1], id: 2 },
    { ...pacientes[2], id: 3 },
  ]);

  expect(PacienteDBModel.findByKeyAndDelete('cpf', '456')).toEqual({ ...pacientes[1], id: 2 });
  expect(PacienteDBModel.find()).toEqual([
    { ...pacientes[2], id: 3 },
  ]);

  expect(PacienteDBModel.findByKeyAndDelete('cpf', '789')).toEqual({ ...pacientes[2], id: 3 });
  expect(PacienteDBModel.find()).toEqual([]);
});
