### Dependências

- npm
    - versão utilizada: 6.14.5
- node
    - versão utilizada: 12.9.1

### Instalação:

- Na pasta "app" instale as bibliotecas necessárias com:
    - `npm install`
- Na pasta "back" faça o mesmo:
    - `npm install`

### Configuração:

- Na pasta "front", no arquivo **src/index.tsx** altere **<ip_server>** pelo IP da máquina.

### Execução:

- Na pasta "app" rode execute:
    - `npm start`
- Na pasta "back" execute:
    - `npm run server`

### Acessos:

- No navegador acesse: `http://localhost:3000/`
- Para acesso externo: `http://<ip_servidor>:3000/`

- Obs.: caso ocorra problema de CORS (identificável pelo console do navegador), tente outro navegador ou dispositivo. Se mesmo assim persistir o problema, utilize `http://localhost:3000/` para testes na máquina local.