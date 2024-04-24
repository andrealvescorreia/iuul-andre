module.exports = class DataUtils {
  static converteStringEmData(dataString) {
    const formato = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = dataString.match(formato);
    if (!match) return false;

    const dia = parseInt(match[1], 10);
    const mes = parseInt(match[2], 10);
    const ano = parseInt(match[3], 10);

    const data = new Date(ano, mes - 1, dia);
    const dataInvalida = data.getFullYear() !== ano
      || data.getMonth() + 1 !== mes
      || data.getDate() !== dia;
    if (dataInvalida) return false;

    return data;
  }

  static #diferencaEmAnos(data1, data2) {
    const diferencaEmMilisegundos = data2 - data1.getTime();
    const anosData = new Date(diferencaEmMilisegundos);
    return Math.abs(anosData.getUTCFullYear() - 1970);
  }

  static calculaIdade(dataNascimentoStr, dataAtual = Date.now()) {
    const dataNascimento = DataUtils.converteStringEmData(dataNascimentoStr);
    return DataUtils.#diferencaEmAnos(dataNascimento, dataAtual);
  }
};
