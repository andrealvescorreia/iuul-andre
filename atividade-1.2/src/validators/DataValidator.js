module.exports = class DataValidator {
  static converteStringEmData(dataString) {
    const dataReg = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = dataString.match(dataReg);
    if (!match) throw new Error('data deve estar no formato DD/MM/AAAA');

    const dia = parseInt(match[1], 10);
    const mes = parseInt(match[2], 10);
    const ano = parseInt(match[3], 10);

    const data = new Date(ano, mes - 1, dia);
    const dataInvalida = data.getFullYear() !== ano
      || data.getMonth() + 1 !== mes
      || data.getDate() !== dia;
    if (dataInvalida) throw new Error('data inválida');

    return data;
  }

  static validaData(data) {
    this.converteStringEmData(data);
    return true;
  }
};
