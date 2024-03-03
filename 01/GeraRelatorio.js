module.exports = class GeraRelatorio {
  constructor(vertices) {
    this.vertices = vertices;
  }

  get #relatorioVertices() {
    let aux = '';
    for (let i = 0; i < this.vertices.length; i++) {
      const v = this.vertices[i];
      aux += `v${i + 1} = (${v.x},${v.y})\n`;
    }
    return aux;
  }

  get #relatorioDistancias() {
    let aux = '';
    for (let i = 0; i < this.vertices.length; i++) {
      const vi = this.vertices[i];
      for (let j = 0; j < this.vertices.length; j++) {
        const vj = this.vertices[j];

        if (vi === vj) continue;

        const distancia = vi.distancia(vj);
        aux += `d(v${i + 1}, v${j + 1}) = ${distancia}\n`;
      }
    }
    return aux;
  }

  get #relatorioIgualdades() {
    let aux = '';
    for (let i = 0; i < this.vertices.length; i++) {
      const vi = this.vertices[i];
      for (let j = 0; j < this.vertices.length; j++) {
        const vj = this.vertices[j];

        if (vi === vj) continue;

        const iguais = vi.equals(vj);
        if (vi.equals(vj))
          aux += `v${i + 1} == v${j + 1}\n`;
        else
          aux += `v${i + 1} != v${j + 1}\n`;
      }
    }
    return aux;
  }

  gera() {
    let relatorio = '';
    relatorio += this.#relatorioVertices + '---\n';
    relatorio += this.#relatorioDistancias + '---\n';
    relatorio += this.#relatorioIgualdades;


    return relatorio;
  }
}