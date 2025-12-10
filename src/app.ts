import Fastify, { FastifyInstance } from "fastify";
import { Server } from "http";
import {getCompaniesHandler,getCompanyByIdHandler} from "./controller/companyController";

export class App {
  private fastify: FastifyInstance<Server>;
  private readonly port: number;

  constructor(port: number) {
    this.port = port;
    this.fastify = Fastify({ logger: true });
    this.registerRoutes();
  }

  private registerRoutes() {
    this.fastify.get("/companies", getCompaniesHandler);
    this.fastify.get("/companies/:id", getCompanyByIdHandler);
  }

  public listen() {
    this.fastify.listen({ port: this.port }, (err, address) => {
      if (err) {
        this.fastify.log.error(err);
        process.exit(1);
      }
      this.fastify.log.info(`Server running at ${address}`);
    });
  }
}
