import readlineSync from 'readline-sync'
import { currencyFromString, format } from '../utils/currency'
import { OperationErrors } from '../controllers/operationCode'
import { type RespostaConversor } from '../interfaces/Conversor'

export default class ConversorView {
  readonly #messages: Map<number, string>

  constructor() {
    this.#messages = new Map()

    this.#setupMessages()
  }

  showHelp(): void {
    console.log('O código das moedas devem ter 3 caracteres, e devem ser distintos.')
    console.log('O valor a ser convertido deve ser superior a 0, e ter duas casas decimais separadas por vírgula.')
    console.log('Insira vazio a qualquer momento para parar a aplicação.\n')
  }

  readMoeda(question: string): string | null {
    const moeda = readlineSync.question(question + ' ')
    if (moeda.length === 0) {
      return null
    }

    if (moeda.length !== 3) {
      console.log('moeda deve ter 3 caracteres. Tente novamente\n')
      return this.readMoeda(question)
    }
    return moeda
  }

  readValor(question: string): number | null {
    const input = readlineSync.question(question + ' ')
    if (input === '') return null
    const valor = currencyFromString(input)
    if (valor === null) {
      console.log('valor inválido. Tente novamente\n')
      return this.readValor(question)
    }
    if (valor <= 0) {
      console.log('valor deve ser superior a zero. Tente novamente\n')
      return this.readValor(question)
    }
    return valor
  }

  process(response: RespostaConversor): void {
    if (response.errors !== undefined) {
      response.errors.forEach((error) => {
        console.log(this.#messages.get(error))
      })
    }
    if (response.success && response.res !== undefined) {
      const res = response.res
      console.log(`${res.moedaOrigem} ${format(res.valorOriginal)} => ${res.moedaDestino} ${format(res.valorConvertido)}`)
      console.log(`Taxa: ${res.taxaDeCambio}`)
    }
    console.log()
  }

  #setupMessages(): void {
    this.#messages.set(
      OperationErrors.COULD_NOT_CONNECT,
      'Não foi possivel acessar o sistema de conversão.'
    )
    this.#messages.set(
      OperationErrors.CURRENCY_CODE_NOT_FOUND,
      'A moeda inserida não foi encontrada ou é inválida.'
    )
    this.#messages.set(
      OperationErrors.EQUAL_CURRENCY_CODES,
      'As moedas de origem e destino devem ser diferentes.'
    )
    this.#messages.set(
      OperationErrors.INVALID_CURRENCY_CODE,
      'As moedas inseridas são inválidas.'
    )
    this.#messages.set(
      OperationErrors.INVALID_CURRENCY_VALUE,
      'O valor inserido é inválido.'
    )
  }
}
