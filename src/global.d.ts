declare module "*.module.scss" {
    const content: { [key: string]: string };
    export default content;
}

declare module "*.json" {
    const content: any;
    export default content;
}
