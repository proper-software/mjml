Npm.depends({
  mjml: "4.6.3",
  handlebars: "4.7.6",
});

Package.describe({
  name: "propersoftware:mjml",
  version: "0.1.0",
  summary: "Use your MJML templates with meteor/emails package",
  git: "https://github.com/proper-software/mjml.git",
  documentation: "README.md",
});

Package.onUse(function (api) {
  api.versionsFrom("1.11");
  api.use("ecmascript");
  api.use("typescript@4.1.2");
  api.use("email");
  api.mainModule("mjml.ts", "server");
});

Package.onTest(function (api) {
  api.use("ecmascript");
  api.use("typescript@4.1.2");
  api.use("tinytest");
  api.use("propersoftware:mjml");
  api.mainModule("mjml-tests.js");
});
