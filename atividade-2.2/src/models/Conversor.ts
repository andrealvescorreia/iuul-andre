import { OperationErrors } from '../controllers/operationCode'
import { type TaxadorIT } from '../interfaces/Taxador'
import type ConversorIT from '../interfaces/Conversor'
import { type RespostaConversor } from '../interfaces/Conversor'

export default class Conversor implements ConversorIT {
  readonly #taxador: TaxadorIT

  constructor(taxador: TaxadorIT) {
    this.#taxador = taxador
  }

  #erros(moedaOrigem: string, moedaDestino: string, valor: number): number[] {
    const errors = []

    if (moedaOrigem.length !== 3) {
      errors.push(OperationErrors.INVALID_CURRENCY_CODE)
    }
    if (moedaDestino.length !== 3) {
      errors.push(OperationErrors.INVALID_CURRENCY_CODE)
    }
    if (moedaOrigem === moedaDestino) {
      errors.push(OperationErrors.EQUAL_CURRENCY_CODES)
    }
    if (valor <= 0) {
      errors.push(OperationErrors.INVALID_CURRENCY_VALUE)
    }
    return errors
  }

  async converte(moedaOrigem: string, moedaDestino: string, valor: number): Promise<RespostaConversor> {
    const errors = this.#erros(moedaOrigem, moedaDestino, valor)
    if (errors.length > 0) {
      return {
        success: false,
        errors
      }
    }

    try {
      const response = await this.#taxador.getCambio(moedaOrigem, moedaDestino)
      if (response.success && response.res !== undefined) {
        const taxaDeCambio = response.res
        const valorConvertido = valor * taxaDeCambio
        return {
          success: true,
          res: {
            moedaOrigem,
            moedaDestino,
            taxaDeCambio,
            valorOriginal: valor,
            valorConvertido
          }
        }
      }
      return { success: false, errors: response.errors }
    } catch (err: any) {
      return {
        success: false,
        errors: [err.message]
      }
    }
  }
}
