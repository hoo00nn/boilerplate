import express, { Express } from "express";
import { createServer, Server } from "http";
import morgan from "morgan";
import hpp from "hpp";
import helmet from "helmet";
import dotenv from "dotenv";
import compression from "compression";
import cors, { CorsOptions } from "cors";

dotenv.config();

const prod = process.env.NODE_ENV === "production";

class App {
  public app: Express;

  public server: Server;

  constructor() {
    this.app = express();
    this.server = createServer(this.app);
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
  }
}

export default new App();
