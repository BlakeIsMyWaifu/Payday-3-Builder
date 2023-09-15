/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  publicPath: "/build/",
  serverBuildPath: "api/index.js",
  serverMainFields: ["main", "module"],
  serverMinify: false,
  serverModuleFormat: "cjs",
  serverPlatform: "node",
  postcss: false
};
