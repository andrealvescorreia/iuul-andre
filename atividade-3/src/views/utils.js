const readline = require('readline-sync');

exports.tentarNovamente = () => {
  const resposta = readline.question('Tentar novamente? (s/n) ');
  return resposta.toLowerCase() !== 'n';
};

exports.executarAcao = async (id, acoes) => {
  const acaoSelecionada = acoes.find((acao) => acao.id === id);
  if (!acaoSelecionada) {
    console.log('Ação inválida.');
    return;
  }
  await acaoSelecionada.executar();
};
