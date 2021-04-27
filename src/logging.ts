import winston from "winston";

export default class Logger {
  private static loggerName = "logger";
  private static logger: winston.Logger;

  public static Init(): void {
    Logger.logger = winston.loggers.add(Logger.loggerName, {
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf((i) => `[${i.level}] ${i.timestamp} - ${i.message}`),
      ),
      transports: [
        new winston.transports.Console(),
      ],
    });
  }

  public static Info(msg: string): void {
    Logger.loggerFunc("info", msg);
  }

  public static Warn(msg: string): void {
    Logger.loggerFunc("warn", msg);
  }

  public static Error(msg: string): void {
    Logger.loggerFunc("error", msg);
  }

  private static loggerFunc(lvl: string, msg: string) {
    if (!Logger.logger) return;
    Logger.logger.log({
      level: lvl,
      message: msg,
    });
  }
}
