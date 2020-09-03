const mjmlToHtml = Npm.require("mjml");
const pathModule = Npm.require("path");
const fsModule = Npm.require("fs");
const handlebars = Npm.require("handlebars");

const constants = {
  MJML: ".mjml",
};

export class MjmlTemplate {
  constructor(filePath) {
    this.filePath = filePath;

    if (!this.fileExists()) {
      throw new Error(
        JSON.stringify(
          `Template "${this.filePath}" cannot be found. Check name of the template.`
        )
      );
    }

    if (this.getExtension() !== constants.MJML) {
      throw new Error(
        JSON.stringify(
          `File is not in .mjml format. Check extension and try again.`
        )
      );
    }
  }

  getAsRawText() {
    return this.readContents();
  }

  compile(text) {
    const result = mjmlToHtml(text, {});

    if (result.errors.length > 0) {
      const errorMessage = result.errors.map(
        (message) =>
          `Line ${message.line} (tag: ${message.tagName}): ${message.message}`
      );

      throw new Error(JSON.stringify(errorMessage));
    }

    return result.html;
  }

  compileToHtml() {
    return this.compile(this.getAsRawText());
  }

  compileWithParamsToHtml(params) {
    const template = handlebars.compile(this.getAsRawText());
    const mjmlSource = template(params);

    return this.compile(mjmlSource);
  }

  getBaseDirectory() {
    return pathModule.resolve(`./assets/app/`);
  }

  getExtension() {
    return pathModule.extname(this.filePath);
  }

  fileExists() {
    return fsModule.existsSync(
      pathModule.join(this.getBaseDirectory(), this.filePath)
    );
  }

  readContents() {
    return fsModule
      .readFileSync(pathModule.join(this.getBaseDirectory(), this.filePath))
      .toString();
  }
}
