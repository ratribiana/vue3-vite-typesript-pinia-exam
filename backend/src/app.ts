import express, { Application } from 'express';

import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from '@config';

import database from '@databases';
import routes from '@routes/index';

import errorMiddleware from '@middlewares/error.middleware';
import notFoundHandler from '@/middlewares/notFoundHandler.middleware';

import { logger, stream } from '@utils/logger';
import { Routes } from '@interfaces/routes.interface';

import expressListEndpoints from 'express-list-endpoints';

class App {
  private app: Application;
  private env: string;
  private port: string | number;

  constructor() {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;
  }

  private async connectToDatabase(): Promise<void> {
    await database.startConnection();
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(compression());
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(cookieParser());
    this.app.use(helmet());
    this.app.use(hpp());
    this.app.use(morgan(LOG_FORMAT, { stream }));
  }

  private initializeErrorHandling(): void {
    this.app.use(errorMiddleware);
  }

  private initializeSwagger(): void {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'TypeScript + Express + Mongoose + MongoDB REST API Doc',
          description: 'This is a REST API Documentation for the Exam',
          version: '1.0.0',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);

    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

    logger.info('[DOCS]: API Docs Initialized.');
  }

  public async closeDbConnection(): Promise<void> {
    await database.closeDatabaseConnection();
  }

  public initializeRoutes(routes: Routes[]): void {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });

    this.app.use(notFoundHandler);

    logger.info('[ROUTES]: All Routes Compiled.');
    logger.info(`=================================================================`);
  }

  public apiServer(): Promise<void> {
    return new Promise(resolve => {
      this.app.listen(this.port, () => {
        logger.info(`=================================================================`);
        logger.info(`[ENV]: ${this.env}`);
        logger.info(`=================================================================`);
        logger.info(`[API]: 🚀 App listening on port ${this.port}.`);
        logger.info(`=================================================================`);
        resolve();
      });
    });
  }

  public getServer(routes?: Routes[]): Application {
    this.initializeRoutes(routes);
    return this.app;
  }

  public async bootServer(): Promise<void> {
    try {
      this.initializeMiddlewares();
      this.initializeErrorHandling();
      this.initializeSwagger();
      await this.apiServer();
      await this.connectToDatabase();
      await this.initializeRoutes(routes);

      logger.info(`[SERVER]: Boot up complete.`);
    } catch (error) {
      logger.info(`[SERVER]: Crashed:`, error);
    }
  }
}

export default App;
