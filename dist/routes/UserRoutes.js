"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _passport = _interopRequireDefault(require("passport"));

var _UsersController = _interopRequireDefault(require("../controllers/UsersController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class User extends _UsersController.default {
  constructor() {
    super();
    this.protectedRoute = _passport.default.authenticate('jwt', {
      session: false
    });
    this.router = (0, _express.Router)();
    this.routes();
  }

  routes() {
    //* POST ROUTES
    this.router.post('/register', this.register());
    this.router.post('/login', this.login());
    this.router.post('/', this.protectedRoute, this.create()); //* GET ROUTES

    this.router.get('/', this.protectedRoute, this.getList());
    this.router.get('/:user_id', this.protectedRoute, this.getOne()); //* PUT ROUTES

    this.router.put('/:user_id/insert', this.protectedRoute, this.insertWeight());
    this.router.put('/:user_id/remove', this.protectedRoute, this.removeWeight());
    this.router.put('/:user_id', this.protectedRoute, this.update()); //* DELETE ROUTES

    this.router.delete('/:user_id', this.protectedRoute, this.delete());
  }

}

const user = new User();
var _default = user.router;
exports.default = _default;
//# sourceMappingURL=UserRoutes.js.map