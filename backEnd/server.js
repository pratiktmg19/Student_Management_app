const express = require('express');
const passport = require('passport');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

const url = require('./config/database').url;

const app = express();
const admins = require('./routes/admin');
const students = require('./routes/student');

//connecting mongodb through mongoose
mongoose.connect(url, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
    .then(() => console.log('db connected ...'))
    .catch(err => console.log(err));


//cors for req at different ports            
app.use(cors());

//express parser

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//passport middleware
app.use(passport.initialize());


// require('./config/passport')(passport);

//Port number
const PORT = process.env.PORT | 3000;

// app.use(express.static(__dirname + "./public/uploads"));
app.use(express.static(path.join(__dirname, 'public')));

//routes to admin and students
app.use('/admin', admins);
app.use('/student', students);


//starting server
app.listen(PORT, () => {
    console.log(`listenning to PORT:${PORT}`)
});