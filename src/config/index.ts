import express from 'express';
import cors from 'cors';
import validateJSON from '@middleware/validateJSON';
import routeArticles from '@routes/index';
import db from './db';

require('dotenv').config();

class Server {
  app: any;
  port: string | number;
  basePath: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.basePath = '/';


    this.dbConnection();

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();

  }

  async dbConnection() {
    try {
      await db.authenticate();
    } catch (error) {
      console.error('error connection ', error);
    }
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Reading and parsing the body
    this.app.use(express.json());

    // validate json entry
    this.app.use(validateJSON);

  }

  routes() {
    this.app.use(this.basePath, routeArticles);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.info(
        'Server running on port: ',
        process.env.PORT,
        'Mode: ',
        process.env.NODE_ENV
      );
    });
  }
}

export default Server;
