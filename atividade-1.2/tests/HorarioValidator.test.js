const HoraValidator = require('../src/validators/HoraValidator');

test('horario 00:00 é válido', () => {
  expect(HoraValidator.valida('0000')).toBe(true);
});

test('horario 13:30 é válido', () => {
  expect(HoraValidator.valida('1330')).toBe(true);
});

test('horario 23:59 é válido', () => {
  expect(HoraValidator.valida('2359')).toBe(true);
});

test('horario vazio deve ser invalido', () => {
  expect(HoraValidator.valida('')).toBe(false);
});

test('horario string deve ser invalido', () => {
  expect(HoraValidator.valida('oioi')).toBe(false);
});

test('horario incorreto deve ser invalido', () => {
  expect(HoraValidator.valida('2460')).toBe(false);
  expect(HoraValidator.valida('-1000')).toBe(false);
  expect(HoraValidator.valida('10599')).toBe(false);
});
