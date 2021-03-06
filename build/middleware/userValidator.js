"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dummyUser = _interopRequireDefault(require("../utils/dummyUser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UserValidator =
/*#__PURE__*/
function () {
  function UserValidator() {
    _classCallCheck(this, UserValidator);
  }

  _createClass(UserValidator, null, [{
    key: "signUpValidator",
    value: function signUpValidator(req, res, next) {
      /* eslint-disable prefer-const */
      var _req$body = req.body,
          firstname = _req$body.firstname,
          lastname = _req$body.lastname,
          email = _req$body.email,
          password = _req$body.password;

      if (!firstname) {
        return res.status(400).json({
          status: 400,
          error: 'firstname is required'
        });
      }

      firstname = firstname.toLowerCase().trim();

      if (!lastname) {
        return res.status(400).json({
          status: 400,
          error: 'lastname is required'
        });
      }

      lastname = lastname.toLowerCase().trim();

      if (!email) {
        return res.status(400).json({
          status: 400,
          error: 'Email is required'
        });
      }

      var nameValidate = /^[a-zA-Z ]+$/;

      if (!nameValidate.test(firstname)) {
        return res.status(400).json({
          status: 400,
          error: 'firstname format is invalid'
        });
      }

      if (!nameValidate.test(lastname)) {
        return res.status(400).json({
          status: 400,
          error: 'lastname format is invalid'
        });
      }

      email = email.toLowerCase().trim();
      /* eslint-disable no-useless-escape */

      var emailVerifier = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

      if (!emailVerifier.test(email)) {
        return res.status(400).json({
          status: 400,
          error: 'Email format is invalid'
        });
      }

      if (email.length < 10 || email.length > 30) {
        return res.status(400).json({
          status: 400,
          error: 'Email is too short'
        });
      }

      var duplicateEmail = _dummyUser.default.find(function (user) {
        return user.email === email;
      });

      if (duplicateEmail) {
        return res.status(409).json({
          status: 409,
          error: 'Email already exists'
        });
      } // Password Validations


      if (!password) {
        return res.status(400).json({
          status: 400,
          error: 'Password is required'
        });
      }

      if (password.length < 8 || password.length > 15) {
        return res.status(400).json({
          status: 400,
          error: 'Password is too short'
        });
      }

      req.body.email = email;
      req.body.password = password;
      return next();
    }
  }, {
    key: "loginValidator",
    value: function loginValidator(req, res, next) {
      var _req$body2 = req.body,
          email = _req$body2.email,
          password = _req$body2.password;

      if (!email) {
        return res.status(400).json({
          status: 400,
          error: 'Email is required'
        });
      }

      email = email.toLowerCase().trim();

      var foundUser = _dummyUser.default.find(function (user) {
        return user.email === email;
      });

      if (!foundUser) {
        return res.status(401).json({
          status: 401,
          error: 'Authentication failed'
        });
      }

      if (!password) {
        return res.status(400).json({
          status: 400,
          error: 'Password is required'
        });
      }

      password = password.trim();

      if (foundUser && password !== foundUser.password) {
        return res.status(401).json({
          status: 401,
          error: 'Incorrect login details'
        });
      }

      req.body.foundUser = foundUser;
      req.body.password = password;
      return next();
    }
  }]);

  return UserValidator;
}();

var _default = UserValidator;
exports.default = _default;
//# sourceMappingURL=userValidator.js.map