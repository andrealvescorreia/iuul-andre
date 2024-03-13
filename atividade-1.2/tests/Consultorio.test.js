const Consultorio = require('../src/models/Consultorio');
const Paciente = require('../src/models/Paciente');
const Agendamento = require('../src/models/Agendamento');

let consultorio;
let pacientes;

function inicializaConsultorio() {
  consultorio = new Consultorio();
}

function adicionaPacientes() {
  pacientes = [
    new Paciente('91523518235', 'Maria', '10/10/2002'),
    new Paciente('77884084848', 'Jose Messias', '10/10/2002'),
  ];
  pacientes.forEach((p) => {
    consultorio.cadastrar(p);
  });
}

function agendaConsultas() {
  consultorio.agendar(new Agendamento(pacientes[0].cpf, '10/10/2024', '1000', '1030'));
  consultorio.agendar(new Agendamento(pacientes[1].cpf, '10/10/2024', '1030', '1045'));

  consultorio.agendar(new Agendamento(pacientes[1].cpf, '11/11/2024', '1330', '1415'));
}

describe('testes inserção de pacientes', () => {
  beforeEach(() => {
    inicializaConsultorio();
    adicionaPacientes();
  });

  test('cria novo consultorio sem pacientes', () => {
    consultorio = new Consultorio();
    expect(consultorio.pacientes).toEqual([]);
  });

  test('insere um paciente', () => {
    consultorio = new Consultorio();
    consultorio.cadastrar(pacientes[0]);
    expect(consultorio.pacientes).toEqual([pacientes[0]]);
  });

  test('insere dois pacientes', () => {
    consultorio = new Consultorio();
    consultorio.cadastrar(pacientes[0]);
    consultorio.cadastrar(pacientes[1]);
    expect(consultorio.pacientes).toEqual(pacientes);
  });

  test('não deve inserir se paciente ja esta cadastrado', () => {
    const novoPaciente = new Paciente('91523518235', 'Jose Messias', '10/10/2002');
    expect(consultorio.cadastrar(novoPaciente)).toBe(false);
    expect(consultorio.pacientes).toEqual(pacientes);
  });
});

describe('testes exclusão de pacientes', () => {
  beforeEach(() => {
    inicializaConsultorio();
    adicionaPacientes();
  });

  test('exclui único paciente', () => {
    consultorio = new Consultorio();
    const paciente = new Paciente('91523518235', 'Maria', '10/10/2002');
    consultorio.cadastrar(paciente);
    expect(consultorio.descadastrar(paciente.cpf)).toBe(true);
    expect(consultorio.pacientes).toEqual([]);
  });

  test('exclui um paciente', () => {
    consultorio.descadastrar(pacientes[0].cpf);
    expect(consultorio.pacientes).toEqual([pacientes[1]]);
  });

  test('exclui dois pacientes', () => {
    consultorio.descadastrar(pacientes[0].cpf);
    consultorio.descadastrar(pacientes[1].cpf);
    expect(consultorio.pacientes).toEqual([]);
  });

  test('não exclui paciente não cadastrado', () => {
    expect(consultorio.descadastrar('01010101')).toBe(false);
    expect(consultorio.pacientes).toEqual(pacientes);
  });

  test('não exclui paciente não cadastrado', () => {
    expect(consultorio.descadastrar('01010101')).toBe(false);
    expect(consultorio.pacientes).toEqual(pacientes);
  });
});

describe('testes agendamentos', () => {
  beforeEach(() => {
    inicializaConsultorio();
    adicionaPacientes();
  });

  test('duas consultas', () => {
    const consulta1 = new Agendamento(pacientes[0].cpf, '10/10/2024', '1000', '1030');
    const consulta2 = new Agendamento(pacientes[1].cpf, '10/10/2024', '1030', '1045');
    expect(consultorio.agendar(consulta1)).toBe(true);
    expect(consultorio.agendar(consulta2)).toBe(true);
    expect(consultorio.agendamentos).toEqual([consulta1, consulta2]);
  });

  test('deve lançar exceção cpf não cadastrado', () => {
    const consulta = new Agendamento('0101010101', '10/10/2024', '1000', '1030');
    expect(() => consultorio.agendar(consulta)
      .toThrow('cpf do paciente não encontrado'));
    expect(consultorio.agendamentos).toEqual([]);
  });

  test('deve lançar exceção data e horario já reservados', () => {
    const consulta1 = new Agendamento(pacientes[0].cpf, '10/10/2024', '1000', '1030');
    const consulta2 = new Agendamento(pacientes[1].cpf, '10/10/2024', '1000', '1015');
    expect(consultorio.agendar(consulta1)).toBe(true);
    expect(() => consultorio.agendar(consulta2)).toThrow('horário já reservado');
    expect(consultorio.agendamentos).toEqual([consulta1]);
  });

  test('deve lançar exceção horario não respeita blocos de 15 minutos', () => {
    const msg = 'apenas horários em blocos de 15 minutos são aceitos. ex: 1000, 1015, 1030, etc.';
    expect(() => consultorio.agendar(new Agendamento(pacientes[0].cpf, '10/10/2024', '1001', '1030')))
      .toThrow(msg);

    expect(() => consultorio.agendar(new Agendamento(pacientes[1].cpf, '10/10/2024', '1000', '1010')))
      .toThrow(msg);

    expect(consultorio.agendamentos).toEqual([]);
  });
});

describe('testes horarioEstaLivre', () => {
  beforeEach(() => {
    inicializaConsultorio();
    adicionaPacientes();
    agendaConsultas();
  });

  test('esta livre', () => {
    expect(consultorio.horarioEstaLivre('10/10/2024', '0930', '1000')).toBe(true);
    expect(consultorio.horarioEstaLivre('10/10/2024', '1045', '1100')).toBe(true);
    expect(consultorio.horarioEstaLivre('11/10/2024', '1030', '1045')).toBe(true);
  });

  test('esta ocupado', () => {
    expect(consultorio.horarioEstaLivre('10/10/2024', '1030', '1045')).toBe(false);
    expect(consultorio.horarioEstaLivre('10/10/2024', '0959', '1046')).toBe(false);
    expect(consultorio.horarioEstaLivre('10/10/2024', '1010', '1020')).toBe(false);
  });
});
