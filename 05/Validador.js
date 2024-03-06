module.exports = class Validador {
  
  validaNome(nome){
    if(nome.length < 5) throw new Error('nome deve ter ao menos 5 caracteres');
    return true;
  }

  validaCPF(cpf){
    if(cpf.length != 11) throw new Error('cpf deve ter 11 digitos');
    if(!Number(cpf)) throw new Error('cpf deve ter valores numericos apenas');

    return true;
  }

  validaData(data){
    throw new Error('data deve estar no formato DD/MM/AAAA');
    return true;
  }
};

