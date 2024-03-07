const Vertice = require('../01/Vertice');
const Poligono = require('../03/Poligono');

test('cria poligono triangular', () => {
  const vertices = [new Vertice(0, 0), new Vertice(2, 0), new Vertice(1, 2)];
  const poligono = new Poligono(vertices);
  expect(poligono.vertices).toEqual(vertices);
});

test('cria poligono quadrilátero', () => {
  const vertices = [new Vertice(0, 0), new Vertice(2, 0), new Vertice(0, 2), new Vertice(2, 2)];
  const poligono = new Poligono(vertices);
  expect(poligono.vertices).toEqual(vertices);
});

test('deve lançar exceção ao criar poligono com menos de tres vertices', () => {
  let vertices = [new Vertice(0, 0), new Vertice(2, 0)];
  const msg = 'O polígono deve ter ao menos três vertices.'
  expect(() => new Poligono(vertices)).toThrow(msg);

  vertices = [new Vertice(0, 0)];
  expect(() => new Poligono(vertices)).toThrow(msg);

  vertices = [];
  expect(() => new Poligono(vertices)).toThrow(msg);
});

test('deve lançar exceção ao criar poligono com dois vertices iguais', () => {
  let vertices = [new Vertice(0, 0), new Vertice(0, 0), new Vertice(1, 0)];
  expect(() => new Poligono(vertices)).toThrow('O polígono deve ter vertices distintos.');
});

test('adiciona um vertice ao poligono', () => {
  const vertices = [new Vertice(0, 0), new Vertice(2, 0), new Vertice(0, 2)];
  const poligono = new Poligono(vertices);
  const novoVertice = new Vertice(4, 3);
  poligono.addVertice(novoVertice);

  expect(poligono.vertices).toEqual([...vertices, novoVertice]);
  expect(poligono.qtdVertices).toBe(4);
});

test('adiciona dois vertices ao poligono', () => {
  const vertices = [new Vertice(0, 0), new Vertice(2, 0), new Vertice(0, 2)];
  const poligono = new Poligono(vertices);
  const novoVertice1 = new Vertice(4, 3);
  poligono.addVertice(novoVertice1);
  const novoVertice2 = new Vertice(6, 8);
  poligono.addVertice(novoVertice2);
  expect(poligono.vertices).toEqual([...vertices, novoVertice1, novoVertice2]);
  expect(poligono.qtdVertices).toBe(5);
});

test('não deve adicionar vertices repetidos', () => {
  const verticesOriginais = [new Vertice(0, 0), new Vertice(2, 0), new Vertice(0, 2)];
  const poligono = new Poligono(verticesOriginais);
  const verticeRepetido1 = new Vertice(0, 0);
  expect(poligono.addVertice(verticeRepetido1)).toBe(false);
  const verticeRepetido2 = new Vertice(2, 0);
  expect(poligono.addVertice(verticeRepetido2)).toBe(false);
  expect(poligono.vertices).toEqual(verticesOriginais);
  expect(poligono.qtdVertices).toBe(3);
});

test('perimetro poligono triangular', () => {
  const vertices = [new Vertice(0, 0), new Vertice(2, 0), new Vertice(1, 2)];
  const poligono = new Poligono(vertices);
  expect(poligono.perimetro).toBeCloseTo(6.47214);
});

test('calcula perimetro poligono triângulo equilátero', () => {
  const verticesTrianguloEquilatero = [
    new Vertice(0, 0),
    new Vertice(2, 0),
    new Vertice(1, Math.sqrt(3))
  ];
  const trianguloEquilatero = new Poligono(verticesTrianguloEquilatero);
  expect(trianguloEquilatero.perimetro).toBeCloseTo(6);
});