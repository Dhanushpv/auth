const mongoose =require('mongoose')

let userSchema = new mongoose.Schema({
    user_type :{
        type : String
    }

});

const UserType = mongoose.model('usertypes', userSchema);

module.exports = UserType;