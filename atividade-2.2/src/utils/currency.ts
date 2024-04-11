function currencyFromString(currency: string): number | null {
  const currencyRegex = /^[0-9]+,([0-9]{2})$/
  if (currency.match(currencyRegex) === null) return null
  return Number(currency.replace(',', '.'))
}

function format(currency: number): string {
  return currency.toFixed(2).replace('.', ',')
}

export { currencyFromString, format }
