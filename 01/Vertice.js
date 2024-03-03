module.exports = class Vertice {
  #x;
  #y;

  constructor(x, y) {
    this.#x = x;
    this.#y = y;
  }

  get x() {
    return this.#x;
  }
  get y() {
    return this.#y;
  }

  distancia(v) {
    const d = Math.sqrt(((this.#x - v.x) ** 2) + ((this.#y - v.y) ** 2)).toFixed(5);
    return Number(d);
  }

  move(x, y) {
    this.#x = x;
    this.#y = y;
  }

  equals(v) {
    return this.#x == v.x && this.#y == v.y;
  }
}
