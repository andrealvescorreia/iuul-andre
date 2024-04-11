import TaxadorExchangeRate from '../models/TaxadorExchangeRate'
import Conversor from '../models/Conversor'
import type Resposta from '../interfaces/Resposta'
import type ConversorIT from '../interfaces/Conversor'

export default class ConversorController implements ConversorIT {
  async converte(moedaOrigem: string, moedaDestino: string, valor: number): Promise<Resposta> {
    const taxador = new TaxadorExchangeRate()
    const conversor = new Conversor(taxador)
    return await conversor.converte(moedaOrigem, moedaDestino, valor)
  }
}
