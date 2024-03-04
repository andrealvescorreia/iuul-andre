const Triangulo = require('../02/Triangulo');
const RelatorioTriangulos = require('../02/RelatorioTriangulos');
const Vertice = require('../01/Vertice');

test('gera relatorio 3 triangulos', () => {
  const t1 = new Triangulo(new Vertice(0, 0), new Vertice(2, 0), new Vertice(1, 2));
  const t2 = new Triangulo(new Vertice(-2, -2), new Vertice(6, 1), new Vertice(-1, 7));
  const t3 = new Triangulo(new Vertice(0, 0), new Vertice(2, 0), new Vertice(1, Math.sqrt(3)));

  const gerador = new RelatorioTriangulos([t1, t2, t3]);

  const relatorioEsperado =
    `t1.vertices: (0,0), (2,0), (1,2)
    t1.tipo: isósceles
    t1.perimetro: 6.47214
    t1.area: 2
    ---
    t2.vertices: (-2,-2), (6,1), (-1,7)
    t2.tipo: escaleno
    t2.perimetro: 26.81893
    t2.area: 34.5
    ---
    t3.vertices: (0,0), (2,0), (1,1.7320508075688772)
    t3.tipo: equilátero
    t3.perimetro: 6
    t3.area: 1.73205
    ---
    t1 != t2
    t1 != t3
    t2 != t1
    t2 != t3
    t3 != t1
    t3 != t2
    ---
    t1.clone().vertices: (0,0), (2,0), (1,2)
    t1 == t1.clone()
    t2.clone().vertices: (-2,-2), (6,1), (-1,7)
    t2 == t2.clone()
    t3.clone().vertices: (0,0), (2,0), (1,1.7320508075688772)
    t3 == t3.clone()
    `.replace(/  +/g, '');

  expect(gerador.gera()).toBe(relatorioEsperado);
});