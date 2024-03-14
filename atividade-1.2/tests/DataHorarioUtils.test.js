const DataHorarioUtils = require('../src/utils/DataHorarioUtils');

test('para padrão internacional', () => {
	expect(DataHorarioUtils.paraPadraoInternacional('31/01/1999')).toBe('01/31/1999');
});

test('to date', () => {
	expect(DataHorarioUtils.toDate('10/10/2010', '1234'))
	.toEqual(new Date('10/10/2010 12:34'));

	expect(DataHorarioUtils.toDate('31/01/1999', '0000'))
	.toEqual(new Date('01/31/1999 00:00'));
});

test('já passou', () => {
	expect(DataHorarioUtils.jaPassou(
		new Date('10/10/2010 12:34'), 
		new Date('10/10/2010 12:35'))
	).toBe(true);

	expect(DataHorarioUtils.jaPassou(
		new Date('12/31/1999 23:59'), 
		new Date('01/01/2000 00:00'))
	).toBe(true);
});

test('ainda não passou', () => {
	expect(DataHorarioUtils.jaPassou(
		new Date('10/10/2010 12:35'), 
		new Date('10/10/2010 12:34'))
	).toBe(false);

	expect(DataHorarioUtils.jaPassou(
		new Date('01/01/2000 00:00'),
		new Date('12/31/1999 23:59'))
	).toBe(false);
});