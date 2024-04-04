import Cliente from '../models/cliente.js';

function geraLog(clientsBody, messagesMap) {
  const log = [];
  clientsBody.forEach((clientBody) => {
    const client = Cliente.createFromObject(clientBody.client);
    if (client.failure) {
      const errorsLog = [];
      if (client.failure) {
        client.failure.forEach((error) => {
          errorsLog.push({
            campo: error.field,
            mensagem: `${error.code} - ${messagesMap.get(error.code)}`,
          });
        });
      }
      log.push({
        dados: clientBody.rawClient,
        erros: errorsLog,
      });
    }
  });
  return log;
}
export default geraLog;
