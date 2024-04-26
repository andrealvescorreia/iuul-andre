const { Sequelize, DataTypes, QueryTypes } = require('sequelize');
const { DateTime } = require('luxon');
const database = require('../database');
const Paciente = require('./Paciente');

function validaDataHora(dateTime) {
  if (dateTime < DateTime.now()) {
    throw new Error('só é possível agendar consultas para o futuro');
  }
  if (
    dateTime.minute !== 0
    && dateTime.minute !== 15
    && dateTime.minute !== 30
    && dateTime.minute !== 45
  ) {
    throw new Error('não obdece bloco de 15 minutos');
  }

  if (
    dateTime.hour < 8
    || dateTime.hour > 19
    || (dateTime.hour === 19 && dateTime.minute > 0)
  ) {
    throw new Error('fora do horario de funcionamento');
  }
}

function validaHorarios(dataHoraInicio, dataHoraFim) {
  if (dataHoraFim === dataHoraInicio) {
    throw new Error('horário fim não pode ser igual a horário início');
  }
  if (dataHoraFim < dataHoraInicio) {
    throw new Error('horário fim não pode anteceder horário início');
  }
  if (dataHoraInicio.toISODate() !== dataHoraFim.toISODate()) {
    throw new Error('horário inicio e fim devem estar no mesmo dia');
  }
}

const hasIntersecaoHorario = (dataHoraInicio1, dataHoraFim1, dataHoraInicio2, dataHoraFim2) => (
  dataHoraFim1 > dataHoraInicio2
  && dataHoraFim1 <= dataHoraFim2)
  || (dataHoraInicio1 >= dataHoraInicio2
    && dataHoraInicio1 < dataHoraFim2)
  || (dataHoraInicio1 <= dataHoraInicio2
    && dataHoraFim1 >= dataHoraFim2
  );

const Agendamento = database.define(
  'Agendamento',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    dataHoraInicio: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        valida(dataHoraInicio) {
          const dateTimeInicio = DateTime.fromISO(dataHoraInicio.toISOString());
          validaDataHora(dateTimeInicio);
        },
      },
    },
    dataHoraFim: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        async valida(dataHoraFim) {
          const dateTimeInicio = DateTime.fromISO(this.dataHoraInicio.toISOString());
          const dateTimeFim = DateTime.fromISO(dataHoraFim.toISOString());
          validaDataHora(dateTimeFim);
          validaHorarios(dateTimeInicio, dateTimeFim);

          const dataAgendamento = this.dataHoraInicio.toISOString().substr(0, 10);
          const agendamentosDoDia = await database.query(`SELECT * FROM agendamentos WHERE CAST(data_hora_inicio AS DATE) = '${dataAgendamento}'`, {
            type: QueryTypes.SELECT,
          });

          agendamentosDoDia.forEach((agendamentoDoDia) => {
            if (hasIntersecaoHorario(
              agendamentoDoDia.data_hora_inicio,
              agendamentoDoDia.data_hora_fim,
              this.dataHoraInicio,
              this.dataHoraFim,
            )) {
              throw new Error('há conflito com outro horario agendado!');
            }
          });
        },
      },
    },
  },
);

Agendamento.belongsTo(Paciente, {
  constraint: true,
  foreignKey: 'cpfPaciente',
});

Paciente.hasMany(Agendamento, {
  foreignKey: 'idAgendamento',
});

module.exports = Agendamento;
