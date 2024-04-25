Olá, infelizmente não deu tempo de finalizar a atividade até o prazo. Toda a parte do sequelize foi finalizada, como a conexão com bd postgres, models e validações das regras de negócio, como também as relações entre as entidades.<br> O que faltou foi adaptar o código da atividade 1.2 para encaixar na tecnologia do ORM, que pretendo fazer até sexta-feira 26/04.

## Como rodar
crie um arquivo `.env` na raiz do projeto, seguindo o modelo a seguir:
```
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=admin
DATABASE=consultorio
```
Por enquanto não tem como o usuário interagir com o sistema, mas existe uma pequena demonstração do funcionamento do código em `node tests/exemplo`