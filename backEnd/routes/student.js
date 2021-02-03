const express = require('express');
const router = express.Router();
// const path = require('path');
const multer = require('multer');
const Student = require('../model/Student');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads');
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName)
    }
});


// Multer Mime Type Validation
var upload = multer({
    storage: storage
})


//Adding new student details 
router.post('/addStudent', upload.single('image'), (req, res) => {
    // const url = req.protocol + '://' + req.get('host');
    // console.log(url);
    // console.log(req.file.filename);
    var file = req.file.filename;
    // console.log(req.body.name);
    // console.log(req.body.email)

    // console.log(req.body.phone)
    const { name, email, phone, passingYear, address, rollNo, department } = req.body;

    const newStudent = new Student({

        name,
        email,
        phone,
        passingYear,
        address,
        rollNo,
        department,
        file
    });
    console.log(newStudent);
    newStudent.save()
        .then(function(user) {
            console.log("saved");
            res.json({ msg: `successfully saved ${user.name} data` })
        })
        .catch(function(err) {
            console.log(err);

        })


    // var path = '';
    //  upload(req, res, function (err) {
    //     if (err) {
    //       // An error occurred when uploading
    //       console.log(err);
    //       return res.status(422).send("an Error occured")
    //     }  
    //    // No error occured.
    // path = req.file.path;
    // console.log(path + "This is path");



});

//Getting whole students details
router.get('/studentlist', (req, res) => {
    Student.find({}, (err, docs) => {
        res.json(docs);
    })
});

//get user by it's id
router.get('/student/:id', (req, res) => {
    Student.findById(req.params.id, (err, docs) => {
        // console.log(docs);
        res.json(docs)
    })
})

//Deleting student 
router.delete('/delete/:id', (req, res) => {
    Student.findByIdAndDelete(req.params.id, (err, docs) => {
        if (err) res.json({ success: "false", msg: 'Cannot delete this student' });
        else res.json({ success: "true", msg: "Successfully deleted " });
    })
});

//Updating student
router.put('/update/:id', upload.single('image'), (req, res) => {



    const body = req.body;
    const name = body.name
    const email = body.email
    const phone = body.phone;
    const passingYear = body.passingYear;
    const address = body.address;
    const rollNo = body.rollNo;
    const department = body.department;


    const updates = {
        name,
        email,
        phone,
        passingYear,
        address,
        rollNo,
        department,
    };
    console.log("this is file");
    console.log(req.file);
    if (req.file) {
        const File = req.file.filename;
        updates.file = File;
    }

    console.log(updates);
    Student.findByIdAndUpdate(req.params.id, { $set: updates }, { new: true }, (err, docs) => {
        console.log("this is docs");
        if (err) res.json({ success: "false", msg: 'Cannot update this student details' });
        else {
            res.json(docs);
        }
    });

});
module.exports = router;