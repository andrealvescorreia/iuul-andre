import type ConversorIT from '../interfaces/Conversor'
import ConversorView from '../views/conversorView'

export default class ConversorPresenter {
  readonly #controller
  readonly #view
  constructor(controller: ConversorIT) {
    this.#controller = controller
    this.#view = new ConversorView()
  }

  async run(): Promise<void> {
    this.#view.showHelp()
    while (true) {
      const moedaOrigem = this.#view.readMoeda('Moeda origem:')
      if (moedaOrigem === null) break

      const moedaDestino = this.#view.readMoeda('Moeda destino:')
      if (moedaDestino === null) break

      const valor = this.#view.readValor('Valor (com duas casas decimais):')
      if (valor === null) break

      const res = await this.#controller.converte(moedaOrigem, moedaDestino, valor)

      this.#view.process(res)
    }
  }
}
