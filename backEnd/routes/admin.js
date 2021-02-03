const express = require('express');

const bcrypt = require('bcryptjs');

const Admin = require('../model/admin');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/database');
// const passport = require('passport');
// const expressJwt = require('express-jwt');

// const checkIfAuthenticated = expressJwt({
//     secret: "guitar"
// });


router.post('/register', (req, res) => {
    const { email, name, password } = req.body;

    Admin.findOne({ email: email })
        .then(user => {
            if (user) {
                return res.json({ success: "false", msg: "Email already exist" })
            } else {
                const newAdmin = new Admin({

                    email: req.body.email,
                    name: req.body.name,
                    password: req.body.password
                });

                // hashing password
                bcrypt.genSalt(10, (err, salt) =>
                    bcrypt.hash(newAdmin.password, salt, (err, hash) => {
                        if (err) throw err;
                        newAdmin.password = hash;
                        newAdmin.save()
                            .then(function(user) {
                                console.log(user)
                                res.json({ success: true, msg: "Successfully registered", user: { name: user.name } })
                            })
                            .catch(function(err) {
                                console.log(err)
                                res.json({ success: false, msg: "Registration failed" });
                            })
                    })
                );
            }
        })
        .catch(err => console.log(err));
});



router.post('/authenticate', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    Admin.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.json({ success: false, msg: "User not found" })
            }

            bcrypt.compare(password, user.password, (err, isMatch) => {

                if (err) throw err;

                if (isMatch) {
                    const token = jwt.sign(user.toJSON(), "guitar", {

                    });

                    res.json({
                        success: true,
                        token: token,
                        expiresIn: 120,
                        user: user
                    });
                } else {
                    return res.json({
                        success: false,
                        msg: "wrong password"
                    });
                }
            });


        })
        .catch(err => console.log(err));

});


router.get('/dashboard', (req, res) => {
    res.json({ user: req.user });
});

module.exports = router;