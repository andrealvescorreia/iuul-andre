const dotenv = require('dotenv');
const Aluno = require('./sequelize/models/Aluno.js');
const database = require('./sequelize/database.js');
const Universidade = require('./sequelize/models/Universidade.js');

dotenv.config();
// const inicia = require('./sequelize/index.js');// auto executa

(async () => {
  // await inicia();
  await database.authenticate(); // assegura que a conexão foi bem sucedida
  await database.sync({ force: true });
  const uni = await Universidade.create({ nome: 'UEPB' });
  const alu = await Aluno.create({ nome: 'maria', idUniversidade: uni.id });
})();
