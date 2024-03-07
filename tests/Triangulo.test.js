const Vertice = require('../01/Vertice');
const Triangulo = require('../02/Triangulo');

test('cria triângulo', () => {
  const vertices = [new Vertice(0, 0), new Vertice(2, 0), new Vertice(1, 2)];
  const triangulo = new Triangulo(vertices);
  expect(triangulo.vertices).toEqual(vertices);
});

test('calcula perimetro do triângulo', () => {
  const verticesTriangulo1 = [new Vertice(0, 0), new Vertice(2, 0), new Vertice(1, 2)];
  const triangulo1 = new Triangulo(verticesTriangulo1);
  expect(triangulo1.perimetro).toBeCloseTo(6.47214);

  const verticesTriangulo2 = [new Vertice(1, 0), new Vertice(2, 6), new Vertice(2, -3)];
  const triangulo2 = new Triangulo(verticesTriangulo2);
  expect(triangulo2.perimetro).toBeCloseTo(18.24504);
});

test('calcula perimetro triângulo equilátero', () => {
  const verticesTrianguloEquilatero = [
    new Vertice(0, 0),
    new Vertice(2, 0),
    new Vertice(1, Math.sqrt(3))
  ];
  const trianguloEquilatero = new Triangulo(verticesTrianguloEquilatero);
  expect(trianguloEquilatero.perimetro).toBeCloseTo(6);
});

test('calcula área do triângulo', () => {
  const verticesTriangulo1 = [new Vertice(0, 0), new Vertice(2, 0), new Vertice(1, 2)];
  const triangulo1 = new Triangulo(verticesTriangulo1);
  expect(triangulo1.area).toBeCloseTo(2);

  const verticesTriangulo2 = [new Vertice(1, 0), new Vertice(2, 6), new Vertice(2, -3)];
  const triangulo2 = new Triangulo(verticesTriangulo2);
  expect(triangulo2.area).toBeCloseTo(4.5);
});

test('calcula área triângulo equilátero', () => {
  const vertices = [
    new Vertice(0, 0),
    new Vertice(2, 0),
    new Vertice(1, Math.sqrt(3))
  ];
  const trianguloEquilatero = new Triangulo(vertices);
  expect(trianguloEquilatero.area).toBeCloseTo(Math.sqrt(3));
});

test('deve lançar exceção ao criar triângulo inválido', () => {
  let verticesTrianguloInvalido = [new Vertice(0, 0), new Vertice(0, 0), new Vertice(0, 0)];
  expect(() => new Triangulo(verticesTrianguloInvalido)).toThrow('O polígono deve ter vertices distintos.');

  verticesTrianguloInvalido = [new Vertice(0, 0), new Vertice(1, 0), new Vertice(2, 0)];
  expect(() => new Triangulo(verticesTrianguloInvalido)).toThrow('Não é um triângulo.');

  verticesTrianguloInvalido = [new Vertice(0, 0), new Vertice(0, 1), new Vertice(0, 2)];
  expect(() => new Triangulo(verticesTrianguloInvalido)).toThrow('Não é um triângulo.');

  verticesTrianguloInvalido = [new Vertice(0, 0), new Vertice(1, 1), new Vertice(2, 2)];
  expect(() => new Triangulo(verticesTrianguloInvalido)).toThrow('Não é um triângulo.');
});


test('triângulo do tipo escaleno', () => {
  const vertices = [new Vertice(0, 0), new Vertice(-2, 0), new Vertice(1, 4)];
  const triangulo = new Triangulo(vertices);
  expect(triangulo.tipo).toEqual('escaleno');
});

test('triângulo do tipo isósceles', () => {
  const vertices = [new Vertice(0, 0), new Vertice(2, 0), new Vertice(1, 2)];
  const triangulo = new Triangulo(vertices);
  expect(triangulo.tipo).toEqual('isósceles');
});

test('triângulo do tipo equilátero', () => {
  const vertices = [
    new Vertice(0, 0),
    new Vertice(2, 0),
    new Vertice(1, Math.sqrt(3))
  ];

  const triangulo = new Triangulo(vertices);
  expect(triangulo.tipo).toEqual('equilátero');
});

test('triângulos iguais', () => {
  const verticesT1 = [new Vertice(0, 0), new Vertice(2, 0), new Vertice(1, 2)];
  const triangulo1 = new Triangulo(verticesT1);

  const verticesT2 = [new Vertice(2, 0), new Vertice(0, 0), new Vertice(1, 2)];
  const triangulo2 = new Triangulo(verticesT2);

  expect(triangulo1.equals(triangulo2)).toBe(true);
});

test('triângulos diferentes', () => {
  const verticesT1 = [new Vertice(0, 0), new Vertice(2, 0), new Vertice(1, 2)];
  const triangulo1 = new Triangulo(verticesT1);

  const verticesT2 = [new Vertice(0, 0), new Vertice(0, 1), new Vertice(1, 2)];
  const triangulo2 = new Triangulo(verticesT2);

  expect(triangulo1.equals(triangulo2)).toBe(false);
});

test('clona triângulo', () => {
  const vertices = [new Vertice(0, 0), new Vertice(2, 0), new Vertice(1, 2)];
  const triangulo1 = new Triangulo(vertices);

  const triangulo2 = triangulo1.clone();

  expect(triangulo1.equals(triangulo2)).toBe(true);
});