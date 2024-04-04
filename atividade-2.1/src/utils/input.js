import fs from 'fs';
import { dateTimeFromString } from './date.js';
import { currencyFromString } from './currency.js';

function readObjectFromJson(path) {
  const rawData = fs.readFileSync(path);
  return JSON.parse(rawData);
}

function readClientsFromJson(path) {
  try {
    const rawClients = readObjectFromJson(path);
    const clients = [];
    rawClients.forEach((rawClient) => {
      const client = {
        nome: rawClient.nome,
        cpf: rawClient.cpf,
        dtNascimento: dateTimeFromString(rawClient.dt_nascimento),
        rendaMensal: currencyFromString(rawClient.renda_mensal),
        estadoCivil: rawClient.estado_civil,
      };
      clients.push({ client, rawClient });
    });

    return {
      success: clients,
    };
  } catch (e) {
    return {
      failure: e,
    };
  }
}

export default readClientsFromJson;
