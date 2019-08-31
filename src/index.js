import Server from './server';
const { PORT, MONGO_URI } = process.env;

const server = new Server(PORT, MONGO_URI);

server.start();