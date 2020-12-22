import IMjmlTemplateParams from "./IMjmlTemplateParams";

export default interface ISendWithMjmlTemplateParams {
    template: IMjmlTemplateParams;
    showLogs: boolean;
    html: string,
}