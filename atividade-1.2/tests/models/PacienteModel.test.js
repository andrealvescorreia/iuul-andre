const Paciente = require('../../src/models/Paciente');

describe('criação de pacientes', () => {
  let pacienteMock = {};
  let pacienteBody = {};
  beforeEach(() => {
    pacienteMock = {
      body: {},
      create(body) {
        this.body = body;
      },
      findByKey() { return null; },
    };

    pacienteBody = {
      cpf: '91523518235',
      nome: 'Maria',
      dataNascimento: '10/10/2002',
    };
  });

  test('salva paciente', () => {
    const paciente = new Paciente(pacienteBody, pacienteMock);
    paciente.save();
    expect(paciente.errors).toEqual([]);
    expect(pacienteMock.body).toEqual(pacienteBody);
  });

  test('não salva paciente nome inválido', () => {
    pacienteBody.nome = 'Mari';
    const paciente = new Paciente(pacienteBody, pacienteMock);
    paciente.save();
    expect(paciente.errors).toContain('nome deve ter ao menos 5 caracteres');
    expect(pacienteMock.body).toEqual({});
  });

  test('não salva paciente cpf inválido', () => {
    pacienteBody.cpf = '1234567890';
    const paciente = new Paciente(pacienteBody, pacienteMock);
    paciente.save();
    expect(paciente.errors).toContain('cpf inválido');
    expect(pacienteMock.body).toEqual({});
  });

  test('não salva paciente cpf existente', () => {
    pacienteMock.findByKey = () => ({
      cpf: '91523518235',
      nome: 'Maria Verdadeira',
      dataNascimento: '10/10/2002',
    });
    const paciente = new Paciente(pacienteBody, pacienteMock);
    paciente.save();
    expect(paciente.errors).toContain('paciente com cpf já cadastrado');
    expect(pacienteMock.body).toEqual({});
  });

  test('não salva paciente com data nascimento em formato inválido', () => {
    pacienteBody.dataNascimento = '10102002';
    const paciente = new Paciente(pacienteBody, pacienteMock);
    paciente.save();
    expect(paciente.errors).toContain('data nascimento inválida');
    expect(pacienteMock.body).toEqual({});
  });
});

describe('encontrar pacientes', () => {
  let pacienteMock = {};
  const pacientes = [
    {
      id: 1,
      cpf: '91523518235',
      nome: 'Maria',
      dataNascimento: '10/10/2002',
    },
    {
      id: 3,
      cpf: '454554545454',
      nome: 'Jesus',
      dataNascimento: '25/12/2004',
    },
    {
      id: 2,
      cpf: '919191991919',
      nome: 'José',
      dataNascimento: '11/11/2003',
    },

  ];
  const pacientesOrdenadosPorNome = [
    pacientes[1],
    pacientes[2],
    pacientes[0],
  ];
  const pacientesOrdenadosPorCpf = [
    pacientes[1],
    pacientes[0],
    pacientes[2],
  ];
  beforeEach(() => {
    pacienteMock = {
      find() {
        return pacientes;
      },
      findByKey(key, value) {
        this.key = key;
        this.value = value;
        return pacientes[0];
      },
    };
  });

  test('encontra pacientes', () => {
    const p = new Paciente(null, pacienteMock);
    expect(p.find()).toEqual(pacientes);
  });

  test('encontra pacientes ordenados por nome', () => {
    const p = new Paciente(null, pacienteMock);
    expect(p.find('nome')).toEqual(pacientesOrdenadosPorNome);
  });

  test('encontra pacientes ordenados por cpf', () => {
    const p = new Paciente(null, pacienteMock);
    expect(p.find('cpf')).toEqual(pacientesOrdenadosPorCpf);
  });

  test('encontra por cpf', () => {
    const p = new Paciente(null, pacienteMock);
    expect(p.findByCpf('91523518235')).toEqual(pacientes[0]);
    expect(pacienteMock.key).toBe('cpf');
    expect(pacienteMock.value).toBe('91523518235');
  });
});

describe('consulta futura', () => {
  const cpfPaciente = '91523518235';
  const pacienteMock = {};
  const agendamentoMock = {};
  const pacientes = [
    {
      id: 1,
      cpf: cpfPaciente,
      nome: 'Maria',
      dataNascimento: '10/10/2002',
    },
    {
      id: 2,
      cpf: '11111111111',
      nome: 'José',
      dataNascimento: '11/11/2003',
    },
    {
      id: 3,
      cpf: '454554545454',
      nome: 'Jesus',
      dataNascimento: '25/12/2004',
    },
  ];

  beforeEach(() => {
    pacienteMock.find = () => pacientes;
  });

  test('tem consultas passadas mas não futura', () => {
    const agendamentos = [
      {
        id: 1,
        cpfPaciente,
        dataConsulta: '10/10/2015',
        horaInicio: '1015',
        horaFim: '1030',
      }, {
        id: 2,
        cpfPaciente,
        dataConsulta: '11/11/2016',
        horaInicio: '1015',
        horaFim: '1030',
      }, {
        id: 3,
        cpfPaciente: '11111111111',
        dataConsulta: '11/11/2035',
        horaInicio: '1015',
        horaFim: '1030',
      },
    ];
    agendamentoMock.find = () => agendamentos;
    const p = new Paciente({}, pacienteMock, agendamentoMock);
    expect(p.consultaFutura(cpfPaciente)).toEqual(null);
  });
  test('tem consultas passadas e uma futura', () => {
    const agendamentos = [
      {
        id: 1,
        cpfPaciente,
        dataConsulta: '10/10/2015',
        horaInicio: '1015',
        horaFim: '1030',
      }, {
        id: 2,
        cpfPaciente,
        dataConsulta: '11/11/2035', // consulta futura
        horaInicio: '1015',
        horaFim: '1030',
      }, {
        id: 3,
        cpfPaciente: '11111111111',
        dataConsulta: '11/11/2035',
        horaInicio: '1015',
        horaFim: '1030',
      },
    ];
    agendamentoMock.find = () => agendamentos;
    const p = new Paciente({}, pacienteMock, agendamentoMock);
    expect(p.consultaFutura(cpfPaciente)).toEqual(agendamentos[1]);
  });
});

describe('deleção de pacientes', () => {
  const cpfPaciente = '91523518235';
  let pacientes = [];
  let pacienteMock = {};
  let agendamentoMock = {};
  let agendamentos = [];
  beforeEach(() => {
    pacientes = [
      {
        id: 1,
        cpf: cpfPaciente,
        nome: 'Maria',
        dataNascimento: '10/10/2002',
      },
      {
        id: 2,
        cpf: '11111111111',
        nome: 'José',
        dataNascimento: '11/11/2003',
      },
      {
        id: 3,
        cpf: '454554545454',
        nome: 'Jesus',
        dataNascimento: '25/12/2004',
      },
    ];
    agendamentos = [
      {
        id: 1,
        cpfPaciente,
        dataConsulta: '11/11/2015',
        horaInicio: '1015',
        horaFim: '1030',
      },
      {
        id: 2,
        cpfPaciente,
        dataConsulta: '12/10/2016',
        horaInicio: '1015',
        horaFim: '1030',
      },
      {
        id: 3,
        cpfPaciente: '1111111111', // consulta de outro paciente, não deve ser deletada
        dataConsulta: '12/10/2016',
        horaInicio: '1015',
        horaFim: '1030',
      },
      {
        id: 4,
        cpfPaciente: '22222222222', // consulta de outro paciente, não deve ser deletada
        dataConsulta: '12/10/2035',
        horaInicio: '1015',
        horaFim: '1030',
      },
    ];
    pacienteMock = {
      find() {
        return pacientes;
      },
      findByKey() {
        return pacientes[0];
      },
      findByKeyAndDelete(key, value) {
        this.key = key;
        this.value = value;
        return pacientes[0];
      },
    };
    agendamentoMock = {
      values: [],
      find() {
        return agendamentos;
      },
      findByKeyAndDelete(key, value) {
        this.key = key;
        this.values.push(value);
      },
    };
  });
  test('deleta paciente sem agendamentos', () => {
    // bd tem apenas agendamentos de outros pacientes
    agendamentoMock.find = () => [agendamentos[2], agendamentos[3]];
    const paciente = new Paciente({}, pacienteMock, agendamentoMock);
    expect(paciente.delete(cpfPaciente)).toEqual(pacientes[0]);

    expect(pacienteMock.key).toBe('cpf');
    expect(pacienteMock.value).toBe(cpfPaciente);
    expect(agendamentoMock.values).toEqual([]);
  });

  test('deleta paciente com consultas já feitas', () => {
    const paciente = new Paciente({}, pacienteMock, agendamentoMock);
    paciente.delete(cpfPaciente);
    expect(agendamentoMock.key).toBe('id');
    expect(agendamentoMock.values).toEqual([1, 2]);
  });

  test('NÃO deleta paciente com consulta pendente', () => {
    agendamentos[0].dataConsulta = '10/10/2035';// consulta futura
    const paciente = new Paciente({}, pacienteMock, agendamentoMock);
    expect(paciente.delete(cpfPaciente)).toBe(null);
    expect(paciente.errors).toEqual(['paciente não pôde ser deletado pois tem uma consulta pendente']);
    expect(pacienteMock.value).toBe(undefined);
    expect(agendamentoMock.values).toEqual([]);
  });

  test('NÃO deleta paciente não encontrado', () => {
    pacienteMock.findByKey = () => null;
    const paciente = new Paciente({}, pacienteMock, agendamentoMock);
    expect(paciente.delete(cpfPaciente)).toBe(null);
    expect(paciente.errors).toEqual(['paciente não pôde ser deletado pois cpf não foi encontrado']);
    expect(pacienteMock.value).toBe(undefined);
    expect(agendamentoMock.values).toEqual([]);
  });
});
