import extensions from "../constants/extensions";
import IMjmlError from "../interfaces/IMjmlError";

const mjmlToHtml = Npm.require("mjml");
const pathModule = Npm.require("path");
const fsModule = Npm.require("fs");
const handlebars = Npm.require("handlebars");

export class MjmlTemplate {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;

    if (!this.fileExists()) {
      throw new Error(
        JSON.stringify(
          `Template "${this.filePath}" cannot be found. Check name of the template.`
        )
      );
    }

    if (this.getExtension() !== extensions.MJML) {
      throw new Error(
        JSON.stringify(
          `File is not in .mjml format. Check extension and try again.`
        )
      );
    }
  }

  getAsRawText() : string {
    return this.readContents();
  }

  compile(text: string) : string {
    const result = mjmlToHtml(text, {});

    if (result.errors.length > 0) {
      const errorMessage = result.errors.map(
        (message: IMjmlError) =>
          `Line ${message.line} (tag: ${message.tagName}): ${message.message}`
      );

      throw new Error(JSON.stringify(errorMessage));
    }

    return result.html;
  }

  compileToHtml() : string {
    return this.compile(this.getAsRawText());
  }

  compileWithParamsToHtml(params: Object) : string {
    const template = handlebars.compile(this.getAsRawText());
    const mjmlSource = template(params);

    return this.compile(mjmlSource);
  }

  getBaseDirectory() : string {
    return pathModule.resolve(`./assets/app/`);
  }

  getExtension() : string {
    return pathModule.extname(this.filePath);
  }

  fileExists() : boolean {
    return fsModule.existsSync(
      pathModule.join(this.getBaseDirectory(), this.filePath)
    );
  }

  readContents() : string {
    return fsModule
      .readFileSync(pathModule.join(this.getBaseDirectory(), this.filePath))
      .toString();
  }
}
