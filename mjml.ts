import { Email } from "meteor/email";
import { MjmlTemplate } from "./utils/MjmlTemplate.class";
import { Log } from "./utils/Log.class";
import ISendWithMjmlTemplateParams from "./interfaces/ISendWithMjmlTemplateParams";
import ILogParams from "./interfaces/ILogParams";

Email.sendWithMjmlTemplate = (options: ISendWithMjmlTemplateParams) => {
  const log = new Log(<ILogParams>{
    enableOutput: options.showLogs
  });

  if (typeof options.template === "undefined") {
    return Email.send(options);
  }

  try {
    const template = new MjmlTemplate(options.template.name);

    options.html = typeof options
      ? template.compileWithParamsToHtml(options.template.params)
      : template.compileToHtml();

    const mailSend = Email.send(options);

    log.success(`Template ${options.template.name} compiled successfully!`);

    return mailSend;
  } catch (error) {
    log.warning(typeof error.message !== "undefined" ? JSON.parse(error.message) : JSON.parse(error));
    log.error(`Template ${options.template.name} cannot be compiled to HTML`);
  }
};
