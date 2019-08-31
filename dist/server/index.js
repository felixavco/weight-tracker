"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _passport = _interopRequireDefault(require("passport"));

var _passportJWT = _interopRequireDefault(require("./passportJWT"));

var _UserRoutes = _interopRequireDefault(require("../routes/UserRoutes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//* Routes
class Server {
  constructor(PORT, MONGO_URI) {
    this.PORT = PORT;
    this.MONGO_URI = MONGO_URI;
    this.server = (0, _express.default)();
    this.config();
    this.routes();
  }

  config() {
    this.server.use((0, _cors.default)());
    this.server.use((0, _morgan.default)('dev'));
    this.server.use(_express.default.urlencoded({
      extended: false
    }));
    this.server.use(_express.default.json());
    this.server.use(_passport.default.initialize());
    (0, _passportJWT.default)(_passport.default);
  }

  routes() {
    this.server.use('/api/user', _UserRoutes.default);
    this.server.use('**', (req, res) => res.send('Welcome to my Rest API'));
  }

  start() {
    _mongoose.default.connect(this.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true
    }).then(() => {
      console.log('Connected to DB');
      this.server.listen(this.PORT, () => {
        console.log('-> Server started on port ' + this.PORT);
      });
    }).catch(err => console.error(err));
  }

}

var _default = Server;
exports.default = _default;
//# sourceMappingURL=index.js.map