const dotenv = require('dotenv');
const Aluno = require('./sequelize/models/Aluno.js');

dotenv.config();
const inicia = require('./sequelize/index.js');// auto executa

(async () => {
  await inicia();
  await Aluno.create({ nome: 'maria' });
})();
