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

describe('deleção de pacientes', () => {
  let pacienteMock = {};
  beforeEach(() => {
    pacienteMock = {
      key: '',
      value: '',
      findByKeyAndDelete(key, value) {
        this.key = key;
        this.value = value;
        return {};
      },
    };
  });
  test('deleta', () => {
    const cpf = '91523518235';
    const paciente = new Paciente({}, pacienteMock);
    paciente.delete(cpf);
    expect(pacienteMock.key).toBe('cpf');
    expect(pacienteMock.value).toBe(cpf);
  });
});
