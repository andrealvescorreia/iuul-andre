const Agendamento = require('../../src/models/Agendamento');

let agendamento;
let agendamentoMock;
let pacienteMock;
let agendamentoBody;

function init() {
  agendamentoMock = {
    body: {},
    create(body) {
      this.body = body;
    },
    find() {
      return [];
    },
  };
  pacienteMock = {
    findByKey(key, value) {
      this.key = key;
      this.value = value;
      return {
        nome: 'paciente',
        cpf: '91523518235',
      };
    },
  };
  agendamentoBody = {
    cpfPaciente: '91523518235',
    dataConsulta: '10/10/2035',
    horaInicio: '1015',
    horaFim: '1030',
  };
}

function criaAgendamento() {
  agendamento = new Agendamento(agendamentoBody, agendamentoMock, pacienteMock);
  agendamento.save();
}

describe('testes salvar agendamento', () => {
  beforeEach(() => {
    init();
  });
  afterEach(() => {
    expect(agendamento.errors).toEqual([]);
    expect(agendamentoMock.body).toEqual(agendamentoBody);
    expect(pacienteMock.key).toEqual('cpf');
    expect(pacienteMock.value).toEqual('91523518235');
  });
  test('salva agendamento', () => {
    criaAgendamento();
  });
  test('não deve dar erro quando paciente tem agendamentos já concluidos', () => {
    agendamentoMock.find = () => [{ // consulta passada
      cpfPaciente: '91523518235',
      dataConsulta: '11/12/2015',
      horaInicio: '1530',
      horaFim: '1630',
    }];
    criaAgendamento();
  });
  test('não deve dar erro quando existem outros agendamentos quaisquer', () => {
    agendamentoMock.find = () => [
      {
        cpfPaciente: '1234',
        dataConsulta: '10/10/2035', // anterior ao agendamento a ser testado
        horaInicio: '1000',
        horaFim: '1015',
      },
      {
        cpfPaciente: '1234',
        dataConsulta: '10/10/2035', // posterior ao agendamento a ser testado
        horaInicio: '1030',
        horaFim: '1045',
      },
    ];
    criaAgendamento();
  });
});

describe('teste não salva agendamento', () => {
  beforeEach(() => {
    init();
  });
  afterEach(() => {
    expect(agendamentoMock.body).toEqual({});
  });
  test('cpf não encontrado', () => {
    pacienteMock.findByKey = () => null;
    criaAgendamento();
    expect(agendamento.errors).toEqual(['cpf deve pertencer a um paciente existente']);
  });
  test('data inválida', () => {
    agendamentoBody.dataConsulta = '111111111';
    criaAgendamento();
    expect(agendamento.errors).toEqual(['data consulta inválida']);
  });
  test('hora invalida', () => {
    agendamentoBody.horaInicio = '2561';
    agendamentoBody.horaFim = '-130';
    criaAgendamento();
    expect(agendamento.errors).toContain('hora inicio inválida', 'hora fim inválida');
  });
  test('hora não segue bloco de 15 minutos', () => {
    agendamentoBody.horaInicio = '1031';
    agendamentoBody.horaFim = '1046';
    criaAgendamento();
    expect(agendamento.errors).toEqual(
      ['hora inicio não se encaixa em blocos de 15 minutos',
        'hora fim não se encaixa em blocos de 15 minutos'],
    );
  });
  test('hora inicio fora do horário de funcionamento', () => {
    agendamentoBody.horaInicio = '0745';
    agendamentoBody.horaFim = '0815';
    criaAgendamento();
    expect(agendamento.errors).toEqual(['hora inicio fora do horário de funcionamento']);
  });
  test('hora fim fora do horário de funcionamento', () => {
    agendamentoBody.horaInicio = '1845';
    agendamentoBody.horaFim = '1915';
    criaAgendamento();
    expect(agendamento.errors).toEqual(['hora fim fora do horário de funcionamento']);
  });
  test('hora fim antecede hora inicio', () => {
    agendamentoBody.horaInicio = '1000';
    agendamentoBody.horaFim = '0930';
    criaAgendamento();
    expect(agendamento.errors).toEqual(['hora fim antecede hora inicio']);
  });
  test('hora inicio e fim iguais', () => {
    agendamentoBody.horaInicio = '1000';
    agendamentoBody.horaFim = '1000';
    criaAgendamento();
    expect(agendamento.errors).toEqual(['hora fim antecede hora inicio']);
  });
  test('horario ocupado', () => {
    agendamentoMock.find = () => [{
      cpfPaciente: '1234',
      dataConsulta: '10/10/2035',
      horaInicio: '1015',
      horaFim: '1030',
    }];
    criaAgendamento();
    expect(agendamento.errors).toEqual(['horário ocupado']);
  });
  test('horario antecede data e hora atual', () => {
    agendamentoBody.dataConsulta = '12/12/2012';
    criaAgendamento();
    expect(agendamento.errors).toEqual(['só é possível marcar consultas para o futuro']);
  });
  test('paciente já tem consulta marcada para o futuro', () => {
    agendamentoMock.find = () => [{
      cpfPaciente: '91523518235',
      dataConsulta: '11/12/2035',
      horaInicio: '1530',
      horaFim: '1630',
    }];
    criaAgendamento();
    expect(agendamento.errors).toEqual(['paciente tem uma consulta pendente']);
  });
});

describe('encontrar agendamentos', () => {
  const agendamentos = [
    {
      id: 1,
      cpfPaciente: '91523518235',
      dataConsulta: '10/10/2035',
      horaInicio: '1015',
      horaFim: '1030',
    },
    {
      id: 2,
      cpfPaciente: '834834834348',
      dataConsulta: '11/10/2035',
      horaInicio: '1030',
      horaFim: '1045',
    },
    {
      id: 3,
      cpfPaciente: '483483434811',
      dataConsulta: '11/10/2035',
      horaInicio: '1045',
      horaFim: '1000',
    },
    {
      id: 4,
      cpfPaciente: '382382838288',
      dataConsulta: '12/10/2035',
      horaInicio: '1045',
      horaFim: '1100',
    },
    {
      id: 5,
      cpfPaciente: '382838288111',
      dataConsulta: '13/10/2035',
      horaInicio: '1045',
      horaFim: '1100',
    },
    {
      id: 6,
      cpfPaciente: '838288111223',
      dataConsulta: '14/10/2035',
      horaInicio: '1045',
      horaFim: '1100',
    },
    {
      id: 7,
      cpfPaciente: '838288111223',
      dataConsulta: '12/12/2035',
      horaInicio: '1045',
      horaFim: '1100',
    },
  ];
  beforeEach(() => {
    agendamentoMock = {
      find() {
        return agendamentos;
      },
      findByKey(key, value) {
        this.key = key;
        this.value = value;
        return agendamentos[0];
      },
    };
  });

  test('encontra agendamentos', () => {
    const a = new Agendamento(null, agendamentoMock);
    expect(a.find()).toEqual(agendamentos);
  });

  test('encontra agendamentos por periodo', () => {
    const periodoInicio = '11/10/2035';
    const periodoFim = '13/10/2035';
    const p = new Agendamento(null, agendamentoMock);
    expect(p.find(periodoInicio, periodoFim)).toEqual([
      agendamentos[1],
      agendamentos[2],
      agendamentos[3],
      agendamentos[4],
    ]);
  });
});
