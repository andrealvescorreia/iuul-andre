const HorarioValidator = require('../src/validators/HorarioValidator');

test('horario 00:00 é válido', () => {
  expect(HorarioValidator.valido('0000')).toBe(true);
});

test('horario 13:30 é válido', () => {
  expect(HorarioValidator.valido('1330')).toBe(true);
});

test('horario 23:59 é válido', () => {
  expect(HorarioValidator.valido('2359')).toBe(true);
});

test('horario vazio deve ser invalido', () => {
  expect(HorarioValidator.valido('')).toBe(false);
});

test('horario string deve ser invalido', () => {
  expect(HorarioValidator.valido('oioi')).toBe(false);
});

test('horario incorreto deve ser invalido', () => {
  expect(HorarioValidator.valido('2460')).toBe(false);
  expect(HorarioValidator.valido('-1000')).toBe(false);
  expect(HorarioValidator.valido('10599')).toBe(false);
});

test('horario obedece bloco de 15 minutos', () => {
  expect(HorarioValidator.obedeceBlocoDe15minutos('0015')).toBe(true);
  expect(HorarioValidator.obedeceBlocoDe15minutos('0030')).toBe(true);
  expect(HorarioValidator.obedeceBlocoDe15minutos('0045')).toBe(true);
  expect(HorarioValidator.obedeceBlocoDe15minutos('0100')).toBe(true);
  expect(HorarioValidator.obedeceBlocoDe15minutos('0115')).toBe(true);
  expect(HorarioValidator.obedeceBlocoDe15minutos('2300')).toBe(true);
  expect(HorarioValidator.obedeceBlocoDe15minutos('2345')).toBe(true);
});

test('horario não obedece bloco de 15 minutos', () => {
  expect(HorarioValidator.obedeceBlocoDe15minutos('0001')).toBe(false);
  expect(HorarioValidator.obedeceBlocoDe15minutos('0014')).toBe(false);
  expect(HorarioValidator.obedeceBlocoDe15minutos('0035')).toBe(false);
  expect(HorarioValidator.obedeceBlocoDe15minutos('1310')).toBe(false);
  expect(HorarioValidator.obedeceBlocoDe15minutos('2359')).toBe(false);
});
