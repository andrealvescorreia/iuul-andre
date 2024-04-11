import type Resposta from './Resposta'
export default interface ConversorIT {
  converte: (moedaOrigem: string, moedaDestino: string, valor: number) => Promise<Resposta>
}

export interface RespostaConversor extends Resposta {
  res?: {
    moedaOrigem: string
    moedaDestino: string
    taxaDeCambio: number
    valorOriginal: number
    valorConvertido: number
  }
}
