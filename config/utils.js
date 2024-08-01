const path = require("path");

const joinPath = (...paths) => path.join(__dirname, ...paths);

module.exports = {
  joinPath,
};
