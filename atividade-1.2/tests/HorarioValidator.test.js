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
