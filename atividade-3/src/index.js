const dotenv = require('dotenv');
const database = require('./sequelize/database.js');

dotenv.config();

(async () => {
  await database.authenticate(); // assegura que a conexão foi bem sucedida
  await database.sync({ force: true });
})();
