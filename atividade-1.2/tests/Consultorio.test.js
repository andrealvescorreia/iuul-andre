const Consultorio = require('../src/models/Consultorio');
const Paciente = require('../src/models/Paciente');

describe('testes', () => {
  let consultorio;
  let pacientes;

  function inicializaConsultorioComPacientes() {
    consultorio = new Consultorio();
    pacientes = [
      new Paciente('91523518235', 'Maria', '10/10/2002'),
      new Paciente('77884084848', 'Jose Messias', '10/10/2002'),
    ];
    pacientes.forEach((p) => {
      consultorio.cadastrar(p);
    });
  }

  beforeEach(() => {
    inicializaConsultorioComPacientes();
  });

  test('cria novo consultorio', () => {
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
});
