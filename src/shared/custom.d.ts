//for typescript-plugin-css-modules
// https://github.com/mrmckeb/typescript-plugin-css-modules#custom-definitions
declare module "*.less" {
  const classes: { [key: string]: string };
  export default classes;
}

// for Webpack Entry
declare let MAIN_WINDOW_WEBPACK_ENTRY: any;
