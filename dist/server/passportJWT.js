"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _passportJwt = require("passport-jwt");

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const opts = {
  jwtFromRequest: _passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET
};

const passportJWT = passport => {
  passport.use(new _passportJwt.Strategy(opts, async (jwt_payload, done) => {
    try {
      const user = await _User.default.findById(jwt_payload.id);

      if (!user) {
        return done(null, false);
      } // * If user is found return the user


      return done(null, user);
    } catch (error) {
      console.error(error);
    }
  }));
};

var _default = passportJWT;
exports.default = _default;
//# sourceMappingURL=passportJWT.js.map