import Server from './server';
const { SERVER_PORT, MONGO_URI } = process.env;

const server = new Server(SERVER_PORT, MONGO_URI);

server.start();