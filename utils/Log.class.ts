import ILogParams from "../interfaces/ILogParams";

const consoleModule = Npm.require("console");

export class Log {
  private outputEnabled : boolean;

  constructor(params : ILogParams) {
    this.outputEnabled = params.enableOutput;
  }

  isOutputEnabled() : boolean {
    return this.outputEnabled === true;
  }

  error(text: string): void {
    if (this.isOutputEnabled()) {
      consoleModule.log("\x1b[31m", `[ERROR]\t ${text}`);
    }
  }
  warning(text: string): void {
    if (this.isOutputEnabled()) {
      consoleModule.log("\x1b[33m", `[WARNING]\t ${text}`);
    }
  }
  success(text: string): void {
    if (this.isOutputEnabled()) {
      consoleModule.log("\x1b[32m", `[SUCCESS]\t ${text}`);
    }
  }
};
