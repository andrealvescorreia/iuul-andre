import Sequelize from 'sequelize';
import databaseConfig from './config/config.js';

import Aluno from './models/Aluno.js';

const models = [Aluno];

export default
  (async function inicia() {
    try {
      const connection = new Sequelize(databaseConfig);
      await connection.authenticate(); // assegura que a conexão foi bem sucedida
      models.forEach((model) => model.init(connection));
      console.log('conexão bem sucedida');
    } catch (e) {
      console.log('não foi possível conectar ao banco de dados.');
      console.log(e);
    }
  }());
