const mongoose = require('mongoose');


const users = new mongoose.Schema({
    name:{
        type : String,
        required : true,
    },
    email:{
        type : String,
        required : true,
    },
    phoneno:{
        type : Number,
        required : true,
    },
    password:{
        type : String,
        required : true,
    },
    user_type:{
        type :mongoose.Schema.Types.ObjectId,
        ref : "usertypes"
    }

});

 let add= mongoose.model("users", users);
 module.exports = add