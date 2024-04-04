function currencyFromString(strCurrency) {
  if (typeof strCurrency !== 'string') return null;
  const currencyRegex = /^[0-9]+,([0-9]{2})$/;
  if (!strCurrency.match(currencyRegex)) return null;
  const renda = Number(strCurrency.replace(',', '.'));
  return renda;
}

export { currencyFromString };
