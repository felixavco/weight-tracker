"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose.default.Schema;
const UserSchema = new Schema({
  name: {
    type: String
  },
  user_name: {
    type: String
  },
  password: {
    type: String
  },
  height: {
    type: Number
  },
  weight_history: [{
    weight: {
      type: Number
    },
    date: {
      type: Date,
      default: new Date()
    }
  }]
});

const User = _mongoose.default.model('User', UserSchema);

var _default = User;
exports.default = _default;
//# sourceMappingURL=User.js.map