const HorarioUtils = require('../src/utils/HorarioUtils');

test('horario to date', () => {
  expect(HorarioUtils.horarioToDate('0800')).toEqual(new Date('1/1/1970 08:00:00'));
});

test('horario dentro do limite', () => {
  expect(HorarioUtils.dentroDoLimite('0800', '1900', '0800')).toBe(true);
  expect(HorarioUtils.dentroDoLimite('0800', '1900', '1859')).toBe(true);
  expect(HorarioUtils.dentroDoLimite('0800', '1900', '1330')).toBe(true);
});

test('horario fora do limite', () => {
  expect(HorarioUtils.dentroDoLimite('0800', '1900', '0759')).toBe(false);
  expect(HorarioUtils.dentroDoLimite('0800', '1900', '1900')).toBe(false);
  expect(HorarioUtils.dentroDoLimite('0800', '1900', '2330')).toBe(false);
});
