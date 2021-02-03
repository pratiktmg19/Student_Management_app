// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;
// const Student = require('../model/Student');
// const config = require('./database');

// module.exports =  function(passport){
// var JwtStrategy = require('passport-jwt').Strategy,
//     ExtractJwt = require('passport-jwt').ExtractJwt;
// var opts = {}
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = 'secret';
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';
// passport.use(new JwtStrategy(opts, async(jwt_payload, done) =>{
//     User.findOne({id: jwt_payload.sub}, function(err, user) {
//         if (err) {
//             return done(err, false);
//         }
//         if (user) {
//             return done(null, user);
//         } else {
//             return done(null, false);
//             // or you could create a new account
//         }
//     });
// }));
// }
// module.exports =  function(passport){
//     let opts = {};
//     opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
//     opts.secretOrKey = config.secret;
//     console.log("hey");
//     passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
//         console.log("hey");
//         Student.findOne(jwt_payload._id,(err, user)=>{
//             if(err) {
//                 return done(err, false)
//             }
//             if (user) {
//                 return done(null, user);

//             } else {
//                 return done(null, false);
//             }
//     });
// }));
// }