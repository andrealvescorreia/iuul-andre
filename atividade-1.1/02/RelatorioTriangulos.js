module.exports = class RelatorioVertices {
  constructor(triangulos) {
    this.triangulos = triangulos;
  }

  #verticesToString(t) {
    const [v1, v2, v3] = t.vertices;
    return `(${v1.x},${v1.y}), (${v2.x},${v2.y}), (${v3.x},${v3.y})`;
  }

  #relatorioTriangulo(t, id) {
    let aux = '';
    aux += `t${id}.vertices: ${this.#verticesToString(t)}\n`;
    aux += `t${id}.tipo: ${t.tipo}\n`
    aux += `t${id}.perimetro: ${Number(t.perimetro.toFixed(5))}\n`
    aux += `t${id}.area: ${Number(t.area.toFixed(5))}\n`
    return aux;
  }

  get #relatorioIgualdades() {
    let aux = '';
    for (let i = 0; i < this.triangulos.length; i++) {
      const ti = this.triangulos[i];
      for (let j = 0; j < this.triangulos.length; j++) {
        const tj = this.triangulos[j];
        if (ti === tj) continue;

        if (ti.equals(tj))
          aux += `t${i + 1} == t${j + 1}\n`;
        else
          aux += `t${i + 1} != t${j + 1}\n`;
      }
    }
    return aux;
  }

  get #relatorioClones() {
    let aux = '';
    for (let i = 0; i < this.triangulos.length; i++) {
      const t = this.triangulos[i];
      const tClone = t.clone();
      aux += `t${i + 1}.clone().vertices: ${this.#verticesToString(tClone)}\n`;
      if (t.equals(tClone))
        aux += `t${i + 1} == t${i + 1}.clone()\n`;
      else
        aux += `t${i + 1} != t${i + 1}.clone()\n`;
    }
    return aux;
  }

  gera() {
    let relatorio = '';
    for (let i = 0; i < this.triangulos.length; i++) {
      const t = this.triangulos[i];
      relatorio += this.#relatorioTriangulo(t, i + 1) + '---\n';
    }

    relatorio += this.#relatorioIgualdades + '---\n';
    relatorio += this.#relatorioClones;

    return relatorio;
  }
}