import { Email } from "meteor/email";
import { MjmlTemplate } from "./utils/MjmlTemplate.class";
import { Log } from "./utils/Log.class";

Email.sendWithMjmlTemplate = (options) => {
  if (typeof options.template === "undefined") {
    return Email.send(options);
  }

  try {
    const template = new MjmlTemplate(options.template.name);

    options.html = typeof options
      ? template.compileWithParamsToHtml(options.template.params)
      : template.compileToHtml();

    const mailSend = Email.send(options);

    if (options.showLogs)
      Log.success(`Template ${options.template.name} compiled successfully!`);

    return mailSend;
  } catch (error) {
    let messageToPrint = JSON.parse(error.message);

    if (options.showLogs) Log.warning(messageToPrint);

    if (options.showLogs)
      Log.error(`Template ${options.template.name} cannot be compiled to HTML`);
  }
};