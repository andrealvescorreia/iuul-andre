const Vertice = require('../01/Vertice');


test('cria novo vertice', () => {
  const vertice = new Vertice(1, 3);
  expect(vertice.x).toBe(1);
  expect(vertice.y).toBe(3);
});

test('calcula distancia entre dois vertices iguais', () => {
  const vertice1 = new Vertice(1, 3);
  const vertice2 = new Vertice(1, 3);
  expect(vertice1.distancia(vertice2)).toBe(0);
});

test('calcula distancia entre dois vertices', () => {
  const vertice1 = new Vertice(1, 3);
  const vertice2 = new Vertice(2, 5);
  expect(vertice1.distancia(vertice2)).toBe(2.23606797749979);
});

test('move vertice para 0,0', () => {
  const vertice = new Vertice(1, 3);
  vertice.move(0, 0)
  expect(vertice.x).toBe(0);
  expect(vertice.y).toBe(0);
});

test('move vertice', () => {
  const vertice = new Vertice(1, 3);
  vertice.move(10, 123)
  expect(vertice.x).toBe(10);
  expect(vertice.y).toBe(123);
});

test('verifica vertices iguais', () => {
  const vertice1 = new Vertice(1, 3);
  const vertice2 = new Vertice(1, 3);
  expect(vertice1.equals(vertice2)).toBe(true);
});

test('verifica vertices diferentes', () => {
  let vertice1 = new Vertice(1, 3);
  let vertice2 = new Vertice(1, 4);
  expect(vertice1.equals(vertice2)).toBe(false);

  vertice1 = new Vertice(1, 3);
  vertice2 = new Vertice(2, 3);
  expect(vertice1.equals(vertice2)).toBe(false);
});