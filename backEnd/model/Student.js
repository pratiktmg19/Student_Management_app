const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    department:{
        type:String
    },
    passingYear:{
        type:Number
    },
    rollNo:{
        type:Number
    },
    email:{
        type:String
    },
    phone:{
        type:Number
    },
    address:{
        type:String
    },
    file: {
        type:String
    }
 
});

module.exports = mongoose.model('Student', studentSchema);