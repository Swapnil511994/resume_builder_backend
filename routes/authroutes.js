const router = require("express").Router();
const { body } = require("express-validator");

const AuthController = require("../controllers/authcontroller");

const authValidator = require("../validators/authvalidator");

//add prefix auth
router.use('/auth', router);

//register: /auth/register
router.post("/register",authValidator.registerRequestValidator,AuthController.register);

//login: /auth/login
router.post("/login",authValidator.loginRequestValidator,AuthController.login);

//exports
module.exports = router;