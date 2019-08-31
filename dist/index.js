"use strict";

var _server = _interopRequireDefault(require("./server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  SERVER_PORT,
  MONGO_URI
} = process.env;
const server = new _server.default(SERVER_PORT, MONGO_URI);
server.start();
//# sourceMappingURL=index.js.map