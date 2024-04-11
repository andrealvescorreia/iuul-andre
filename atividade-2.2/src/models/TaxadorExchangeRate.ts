import axios from 'axios'
import { type TaxadorIT, type RespostaTaxador } from '../interfaces/Taxador'
import { OperationErrors } from '../controllers/operationCode'
export default class TaxadorExchangeRate implements TaxadorIT {
  async getCambio(moedaOrigem: string, moedaDestino: string): Promise<RespostaTaxador> {
    const apiKey = 'cda2d0418107ccc30ecf4381'

    try {
      const response = await axios.get(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${moedaOrigem}/${moedaDestino}`)

      const taxaDeCambio = response.data.conversion_rate
      return {
        success: true,
        res: taxaDeCambio
      }
    } catch (error: any) {
      if (error.code === 'ENOTFOUND') {
        return {
          success: false,
          errors: [OperationErrors.COULD_NOT_CONNECT]
        }
      }
      const responseData = error.response?.data
      if (responseData.result === 'error') {
        const errors = []
        if (responseData.error_type === 'unsupported-code') {
          errors.push(OperationErrors.CURRENCY_CODE_NOT_FOUND)
        } else if (responseData.error_type === 'invalid-key') {
          errors.push(OperationErrors.COULD_NOT_CONNECT)
        } else {
          errors.push(OperationErrors.INVALID_CURRENCY_CODE)
        }
        return {
          success: false,
          errors
        }
      }
      return {
        success: false,
        errors: [OperationErrors.COULD_NOT_CONNECT]
      }
    }
  }
}
