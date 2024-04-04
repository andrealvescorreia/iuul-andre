import geraLog from '../utils/logGenerator.js';
import writeJson from '../utils/output.js';
import ClienteErrorMessagesPTBR from '../views/ClienteErrorMessagesPTBR.js';
import { OperationStatus } from './operation-code.js';

class ClienteLogController {
  escreveLog(clientes, path) {
    const log = geraLog(clientes, new ClienteErrorMessagesPTBR().messagesMap);
    try {
      writeJson(log, path);
      return {
        status: OperationStatus.SUCCESS,
      };
    } catch (e) {
      return {
        status: OperationStatus.FAILURE,
        errors: [e],
      };
    }
  }
}

export default ClienteLogController;
