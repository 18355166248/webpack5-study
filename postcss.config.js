const config = {
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    require("cssnano"),
    // require("postcss-modules")({
    //   // generateScopedName: function (name, filename, css) {
    //   //   var path = require("path");
    //   //   var i = css.indexOf("." + name);
    //   //   var line = css.substr(0, i).split(/[\r\n]/).length;
    //   //   var file = path.basename(filename, ".css");

    //   //   return "_" + file + "_" + line + "_" + name;
    //   // },
    //   generateScopedName: "[name]__[local]___[hash:base64:5]",
    // }),
  ],
};

module.exports = config;
