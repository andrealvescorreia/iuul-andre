const Sequelize = require('sequelize');
const databaseConfig = require('./config/config.js');

const Aluno = require('./models/Aluno.js');

const models = [Aluno];

module.exports = async () => {
  try {
    const sequelize = new Sequelize(databaseConfig);
    await sequelize.authenticate(); // assegura que a conexão foi bem sucedida
    models.forEach((model) => model.init(sequelize));
    await sequelize.sync();
    console.log('conexão bem sucedida');
  } catch (e) {
    console.log('não foi possível conectar ao banco de dados.');
    console.log(e.message);
  }
};
