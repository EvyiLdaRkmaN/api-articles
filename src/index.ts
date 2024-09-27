import Server from './config';

require('dotenv').config();

const server = new Server();

server.listen();
