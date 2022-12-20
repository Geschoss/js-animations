const isDevelopment = import.meta.env.MODE === 'development';
class Debug {
  logger: Console;
  constructor(logger = console) {
    this.logger = logger;
  }

  log(...args) {
    this.logger.log(...args);
  }
  warn(...args) {
    this.logger.warn(...args);
  }
  error(...args) {
    this.logger.error(...args);
  }
}
class ProdDebug {
  log() {}
  warn() {}
  error() {}
}

export const debug = (
  isDevelopment ? new Debug(console) : new ProdDebug()
) as Debug;
