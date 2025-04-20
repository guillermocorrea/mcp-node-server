import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { ILogger } from "../contracts/ILogger";

export class DefaultLogger implements ILogger {
  constructor(private readonly server: Server) {}

  log(message: string): void {
    this.server.sendLoggingMessage({
      level: "info",
      data: message,
    });
  }

  error(message: string): void {
    this.server.sendLoggingMessage({
      level: "error",
      data: message,
    });
  }

  warn(message: string): void {
    this.server.sendLoggingMessage({
      level: "warning",
      data: message,
    });
  }
}
