// css-loader 写法改造请看 https://github.com/webpack-contrib/css-loader/releases/tag/v7.0.0
declare module "*.module.css" {
  const classes: { [key: string]: string };
  export = classes;
}

declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export = classes;
}

declare module "*.module.sass" {
  const classes: { [key: string]: string };
  export = classes;
}
declare module "*.jpg" {
  const value: string;
  export default value;
}

declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.svg" {
  const value: string;
  export default value;
}

declare module "*.gif" {
  const value: string;
  export default value;
}
