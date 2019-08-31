"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  SECRET
} = process.env;

class UsersController {
  /**
   * @Route '/api/user/register'
   * @Method POST
   * @Access Public
   */
  register() {
    return async (req, res) => {
      try {
        const {
          name,
          user_name,
          password
        } = req.body; //checks if the email address already exist

        const user = await _User.default.findOne({
          user_name
        });

        if (user) {
          return res.status(409).json({
            error: "El nombre de usuario ya existe"
          });
        } //* Encrypt plain password


        const salt = await _bcryptjs.default.genSalt(12);
        const hashed_password = await _bcryptjs.default.hash(password, salt); //* Create new user

        const newUser = new _User.default({
          name,
          user_name,
          password: hashed_password
        });
        await newUser.save();
        res.status(201).json({
          msg: 'OK'
        });
      } catch (error) {
        res.status(500).json({
          ERROR: error.toString()
        });
      }
    };
  }
  /**
   * @Route '/api/user/login'
   * @Method POST
   * @Access Public
   */


  login() {
    return async (req, res) => {
      try {
        const {
          user_name,
          password
        } = req.body;
        const errorResponse = {
          error: 'El usuario o la contraseña son incorrectos'
        }; //* Find user by user_name

        const user = await _User.default.findOne({
          user_name
        });

        if (!user) {
          return res.status(404).json(errorResponse);
        } //* Compare passwords


        const isMatch = await _bcryptjs.default.compare(password, user.password);

        if (!isMatch) {
          return res.status(401).json(errorResponse);
        } else {
          const {
            id,
            name,
            user_name
          } = user;
          const payload = {
            id,
            name,
            user_name
          }; //* Generate Token

          const token = await _jsonwebtoken.default.sign(payload, SECRET, {
            expiresIn: '30d'
          }); //* Expires in 30 days

          res.status(200).json({
            success: true,
            type: 'Bearer',
            token: token
          });
        }
      } catch (error) {
        res.status(500).json({
          ERROR: error.toString()
        });
      }
    };
  }
  /**
  * @Route '/api/user'
  * @Method POST
  * @Access Protected
  */


  create() {
    return async (req, res) => {
      try {
        //* Create new user
        const newUser = new _User.default({
          name: req.body.name
        });
        await newUser.save();
        res.status(201).json({
          msg: 'OK'
        });
      } catch (error) {
        res.status(500).json({
          ERROR: error.toString()
        });
      }
    };
  }
  /**
  * @Route '/api/user'
  * @Method GET
  * @Access Protected
  */


  getList() {
    return async (req, res) => {
      try {
        const users = await _User.default.find();
        const response = users.map(user => {
          return {
            id: user._id,
            name: user.name,
            lastest_weight: user.weight_history[0] || null
          };
        });
        res.json(response);
      } catch (error) {
        res.status(500).json({
          ERROR: error.toString()
        });
      }
    };
  }
  /**
  * @Route '/api/user/:user_id'
  * @Method GET
  * @Access Protected
  */


  getOne() {
    return async (req, res) => {
      try {
        const {
          user_id
        } = req.params;
        const user = await _User.default.findById(user_id);

        if (!user) {
          return res.status(404).json({
            error: 'No ha encontrado ningun usuario'
          });
        }

        const response = {
          id: user._id,
          name: user.name,
          weight_history: user.weight_history
        };
        res.json(response);
      } catch (error) {
        res.status(500).json({
          ERROR: error.toString()
        });
      }
    };
  }
  /**
  * @Route '/api/user/:user_id'
  * @Method PUT
  * @Access Protected
  */


  update() {
    return async (req, res) => {
      try {
        const {
          user_id
        } = req.params;
        const {
          name
        } = req.body;
        const user = await _User.default.findByIdAndUpdate(user_id, {
          name
        }, {
          new: true
        });

        if (!user) {
          return res.status(404).json({
            error: 'No ha encontrado ningun usuario'
          });
        }

        res.json(user);
      } catch (error) {
        res.status(500).json({
          ERROR: error.toString()
        });
      }
    };
  }
  /**
  * @Route '/api/user/:user_id'
  * @Method DELETE
  * @Access Protected
  */


  delete() {
    return async (req, res) => {
      try {
        const {
          user_id
        } = req.params;
        await _User.default.findByIdAndDelete(user_id);
        res.json({
          msg: 'OK'
        });
      } catch (error) {
        res.status(500).json({
          ERROR: error.toString()
        });
      }
    };
  }
  /**
  * @Route '/api/user/:user_id/insert'
  * @Method PUT 
  * @Access Protected
  */


  insertWeight() {
    return async (req, res) => {
      try {
        const {
          user_id
        } = req.params;
        const {
          weight
        } = req.body; //* Find User 

        let user = await _User.default.findById(user_id);

        if (!user) {
          return res.status(404).json({
            error: 'No ha encontrado ningun usuario'
          });
        }

        const {
          weight_history
        } = user; //* add new weight entry and spread current weight history

        const newEntry = [{
          weight
        }, ...weight_history]; //* Update user with new weight history

        user = await _User.default.findByIdAndUpdate(user_id, {
          weight_history: newEntry
        }, {
          new: true
        });
        res.json(user);
      } catch (error) {
        res.status(500).json({
          ERROR: error.toString()
        });
      }
    };
  }
  /**
  * @Route '/api/user/:user_id/remove'
  * @Method PUT 
  * @Access Protected
  */


  removeWeight() {
    return async (req, res) => {
      try {
        const {
          user_id
        } = req.params;
        const {
          reg_id
        } = req.body; //* Find User 

        let user = await _User.default.findById(user_id);

        if (!user) {
          return res.status(404).json({
            error: 'No ha encontrado ningun usuario'
          });
        }

        const {
          weight_history
        } = user; //* add new weight entry and spread current weight history

        const updatedHistory = weight_history.filter(item => item._id.toString() !== reg_id); //* Update user with updated weight history

        user = await _User.default.findByIdAndUpdate(user_id, {
          weight_history: updatedHistory
        }, {
          new: true
        });
        res.json(user);
      } catch (error) {
        res.status(500).json({
          ERROR: error.toString()
        });
      }
    };
  }

}

var _default = UsersController;
exports.default = _default;
//# sourceMappingURL=UsersController.js.map