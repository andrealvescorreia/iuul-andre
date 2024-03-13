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

test('horarios não se sobrepoem', () => {
  expect(HorarioUtils.seSobrepoem(
    { inicio: '0800', fim: '1900' },
    { inicio: '1900', fim: '2000' },
  )).toBe(false);

  expect(HorarioUtils.seSobrepoem(
    { inicio: '1900', fim: '2000' },
    { inicio: '0800', fim: '1900' },
  )).toBe(false);

  expect(HorarioUtils.seSobrepoem(
    { inicio: '1000', fim: '1030' },
    { inicio: '1035', fim: '1040' },
  )).toBe(false);
});

test('horarios se sobrepoem', () => {
  expect(HorarioUtils.seSobrepoem(
    { inicio: '0800', fim: '1900' },
    { inicio: '0800', fim: '1900' },
  )).toBe(true);

  expect(HorarioUtils.seSobrepoem(
    { inicio: '0800', fim: '1900' },
    { inicio: '0759', fim: '1901' },
  )).toBe(true);

  expect(HorarioUtils.seSobrepoem(
    { inicio: '1000', fim: '1030' },
    { inicio: '1029', fim: '1040' },
  )).toBe(true);
});
