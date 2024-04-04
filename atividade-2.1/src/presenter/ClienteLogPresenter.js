import process from 'process';
import path from 'path';
import { DateTime } from 'luxon';
import readClientsFromJson from '../utils/input.js';

class ClienteLogPresenter {
  #controller;

  constructor(controller) {
    // Referencia o controller
    this.#controller = controller;
  }

  run() {
    const inputFullPath = process.argv[2];

    // le o arquivo json com clientes
    const resLeitura = readClientsFromJson(inputFullPath);
    if (resLeitura.failure) {
      console.log('Não foi possível ler o arquivo ', inputFullPath);
      return;
    }
    const clientes = resLeitura.success;

    const outputDir = path.dirname(inputFullPath);
    const outputPath = `${outputDir}/${this.#generateFileName()}`;

    // escreve o log num arquivo json
    const resEscrita = this.#controller.escreveLog(clientes, outputPath);
    if (resEscrita.failure) {
      console.log('Não foi possível escrever o arquivo', outputPath);
      return;
    }
    console.log('Arquivo gerado com sucesso em:', outputPath);
  }

  #generateFileName() {
    const zeroAesquerda = (numero) => String(numero).padStart(2, '0');

    const now = DateTime.now();
    const day = zeroAesquerda(now.day);
    const month = zeroAesquerda(now.month);
    const hour = zeroAesquerda(now.hour);
    const minute = zeroAesquerda(now.minute);
    const second = zeroAesquerda(now.second);
    return `erros-${day}${month}${now.year}-${hour}${minute}${second}.json`;
  }
}
export default ClienteLogPresenter;
