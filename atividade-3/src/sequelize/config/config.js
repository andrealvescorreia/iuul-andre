const dotenv = require('dotenv');

dotenv.config();
module.exports = {
  dialect: 'postgresql',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  // opcao 'logging: false' desabilita o log que o sequelize faz de cada query SQL
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
  dialectOptions: {
    useUTC: false,
  },
  timezone: 'America/Sao_Paulo',
};
