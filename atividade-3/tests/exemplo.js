const dotenv = require('dotenv');
const Paciente = require('../src/sequelize/models/Paciente.js');
const database = require('../src/sequelize/database.js');
const Agendamento = require('../src/sequelize/models/Agendamento.js');

dotenv.config();

(async () => {
  await database.sync({ force: true });
  try {
    const p = await Paciente.create({ cpf: '14386861459', nome: 'andree', dataNascimento: '2002-05-10' });
    await Agendamento.create({
      dataHoraInicio: new Date('2024-12-17T08:00:00'),
      dataHoraFim: new Date('2024-12-17T11:00:00'),
      cpfPaciente: p.cpf,
    });
    await Agendamento.create({
      dataHoraInicio: new Date('2024-12-17T11:00:00'),
      dataHoraFim: new Date('2024-12-17T14:45:00'),
      cpfPaciente: p.cpf,
    });
    console.log('deu nenhum erro');
  } catch (e) {
    console.log(e.message);
  }
})();
