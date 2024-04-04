import ClienteLogController from './src/controllers/clienteLogController.js';
import ClienteLogPresenter from './src/presenter/ClienteLogPresenter.js';

const controller = new ClienteLogController();
const presenter = new ClienteLogPresenter(controller);
presenter.run();
