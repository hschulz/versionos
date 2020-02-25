import { ApiServer } from './src/server/ApiServer'

const port: number = parseInt(process.env.PORT || '31337', 10)

const server: ApiServer = new ApiServer();
server.start(port);
