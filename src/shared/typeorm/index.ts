import { createConnection } from 'typeorm';

//Este médodo procura em toda a estrutura do projeto, o arquivo "ormconfig.json",
//para isso, basta importar este arquivo no server.ts
createConnection();
