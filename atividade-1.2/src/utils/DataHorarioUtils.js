module.exports = class DataHorarioUtils {
	static paraPadraoInternacional(dataPadraoBrasileiro) {
		return `${dataPadraoBrasileiro.slice(3,5)}/${dataPadraoBrasileiro.slice(0,2)}/${dataPadraoBrasileiro.slice(-4)}`;
	}

	static toDate(dataStr, horaStr){
		const dataPadraoInter = DataHorarioUtils.paraPadraoInternacional(dataStr);
		return new Date(`${dataPadraoInter} ${horaStr.slice(0, 2)}:${horaStr.slice(-2)}`);
	}

	static jaPassou(data, dataAtual = Date.now()) {
		return data < dataAtual;
	}
}