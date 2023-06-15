const {body} = require("express-validator");

const registerRequestValidator = [
    body("email").trim().isEmail().isLength({min: 1}).withMessage("Email is required"),
    body("mobile").withMessage("Mobile key missing"),
    body("password").trim().isLength({min: 1, max:100}).withMessage("Password is required"),
    body("password_confirm").trim().isLength({min: 1, max:100}).withMessage("Confirmation Password is required")
];

const loginRequestValidator = [
    body("email").trim().isEmail().isLength({min: 1}).withMessage("Email is required"),
    body("password").trim().isLength({min:1}).withMessage("Password is required")
];

//exports
module.exports = {registerRequestValidator, loginRequestValidator};