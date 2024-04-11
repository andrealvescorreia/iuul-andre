import type Resposta from './Resposta'

export interface RespostaTaxador extends Resposta {
  res?: number
}

export interface TaxadorIT {
  getCambio: (moedaOrigem: string, moedaDestino: string) => Promise<RespostaTaxador>
}
