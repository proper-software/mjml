const consoleModule = Npm.require("console");

export const Log = {
  error: (text) => consoleModule.log("\x1b[31m", `[ERROR]\t ${text}`),
  warning: (text) => consoleModule.log("\x1b[33m", `[WARNING]\t ${text}`),
  success: (text) => consoleModule.log("\x1b[32m", `[SUCCESS]\t ${text}`),
};
