// User model
const User = require("../models/user");

// Validation
const { validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");

class Auth 
{
    static async register(req, res) 
    {
        try 
        {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                // Handle validation errors
                return res.status(400).json({ errors: errors.array() });
            }

            // Destructuring
            const { email, mobile, password } = req.body;

            let userAdded = new User({
                email,
                mobile,
                password,
            });

            userAdded = await userAdded.addUser();

            // Handle userAdded value
            if (userAdded) {
                return res.status(200).json({ message: "User registered successfully" });
            } 
            else {
                return res.status(500).json({ message: "Failed to register user" });
            }
        } 
        catch (error) 
        {
            console.error(error);
            return res.status(500).json({
                message: "Unexpected Error Occurred, try again later",
            });
        }
    }

    static async login(req, res) 
    {
        try 
        {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                // Handle validation errors
                return res.status(400).json({ errors: errors.array() });
            }

            // Get email and password from request body
            const { email, password } = req.body;

            // Check if user exists
            const user = await User.findByEmail(email);
            if (user) 
            {
                // User exists, compare passwords
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (passwordMatch) 
                {
                    // Passwords match, authentication successful
                    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
                    res.status(200).json({
                        message: "Login successful",
                        user: user,
                        token: token,
                    });
                } 
                else 
                {
                    // Passwords don't match
                    res.status(401).json({
                        message: "Incorrect password",
                    });
                }
            } 
            else 
            {
                // User doesn't exist
                res.status(404).json({
                message: "User not found",
                });
            }
        } 
        catch (error) 
        {
            console.error(error);
            res.status(500).json({
                message: "Unexpected Error Occurred, try again later",
            });
        }
    }
}

// Exports
module.exports = Auth;
