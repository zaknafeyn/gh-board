
import { existsSync, mkdirSync, appendFileSync } from 'fs';
import { join } from 'path';

export class LoggingService {
  private logDir = 'logs';
  private logFile = 'gh-board.log';
  private logPath = join(this.logDir, this.logFile);

  constructor(private ignoreLogs = false) {
    if (ignoreLogs) {
      this.ensureLogDirectory();
    }
  }

  private ensureLogDirectory(): void {
    if (!existsSync(this.logDir)) {
      mkdirSync(this.logDir, { recursive: true });
    }
  }

  private log(level: string, message: string, data?: unknown): void {
    if (this.ignoreLogs) return;

    const timestamp = new Date().toISOString();
    const formattedMessage = `[${timestamp}] ${level.toUpperCase()}: ${message}`;

    let logEntry = formattedMessage;
    if (data) {
      logEntry += ` Data: ${JSON.stringify(data, null, 2)}`;
    }
    logEntry += '\n';

    appendFileSync(this.logPath, logEntry);
  }

  public error(message: string, data?: unknown): void {
    this.log('error', message, data);
  }

  public warn(message: string, data?: unknown): void {
    this.log('warn', message, data);
  }

  public info(message: string, data?: unknown): void {
    this.log('info', message, data);
  }

  public debug(message: string, data?: unknown): void {
    this.log('debug', message, data);
  }
}

export const loggingService = new LoggingService();
