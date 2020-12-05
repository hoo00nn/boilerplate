import { ApolloServer, PubSub } from "apollo-server-express";
import express, { Express } from "express";
import { createServer, Server } from "http";
import morgan from "morgan";
import hpp from "hpp";
import helmet from "helmet";
import dotenv from "dotenv";
import compression from "compression";
import cors, { CorsOptions } from "cors";

import schema from "./config/schema";

dotenv.config();

const GRAPHQL_ENDPOINT = "/graphql";

const prod = process.env.NODE_ENV === "production";

class App {
  public app: Express;

  public server: Server;

  private pubsub: PubSub;

  private apolloServer: ApolloServer;

  constructor() {
    this.app = express();
    this.pubsub = new PubSub();
    this.server = createServer(this.app);
    this.apolloServer = new ApolloServer({
      schema,
      context: (ctx) => ({ ...ctx, pubsub: this.pubsub }),
      playground: true,
    });
    this.middlewares();
  }

  private middlewares() {
    const corsOptions: CorsOptions = {
      credentials: true,
    };
    if (prod) {
      corsOptions.origin = "배포 주소";
      this.app.use(helmet());
      this.app.use(hpp());
      this.app.use(morgan("combined"));
    } else {
      corsOptions.origin = "http://localhost:3000";
      this.app.use(morgan("dev"));
      this.app.use(express.json());
    }
    this.app.use(cors(corsOptions));
    this.app.use(compression());
    this.apolloServer.applyMiddleware({
      app: this.app,
      path: GRAPHQL_ENDPOINT,
      cors: corsOptions,
    });
    this.apolloServer.installSubscriptionHandlers(this.server);
  }
}

export default new App();
