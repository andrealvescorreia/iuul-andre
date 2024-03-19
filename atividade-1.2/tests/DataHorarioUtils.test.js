const DataHoraUtils = require('../src/utils/DataHoraUtils');

test('para padrão internacional', () => {
  expect(DataHoraUtils.paraPadraoInternacional('31/01/1999')).toBe('01/31/1999');
});

test('to date', () => {
  expect(DataHoraUtils.toDate('10/10/2010', '1234'))
    .toEqual(new Date('10/10/2010 12:34'));

  expect(DataHoraUtils.toDate('31/01/1999', '0000'))
    .toEqual(new Date('01/31/1999 00:00'));
});

test('já passou', () => {
  expect(DataHoraUtils.jaPassou(
    new Date('10/10/2010 12:34'),
    new Date('10/10/2010 12:35'),
  )).toBe(true);

  expect(DataHoraUtils.jaPassou(
    new Date('12/31/1999 23:59'),
    new Date('01/01/2000 00:00'),
  )).toBe(true);
});

test('ainda não passou', () => {
  expect(DataHoraUtils.jaPassou(
    new Date('10/10/2010 12:35'),
    new Date('10/10/2010 12:34'),
  )).toBe(false);

  expect(DataHoraUtils.jaPassou(
    new Date('01/01/2000 00:00'),
    new Date('12/31/1999 23:59'),
  )).toBe(false);
});
