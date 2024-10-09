const success_function = require('../util/userResponse').success_function;
const error_function = require('../util/userResponse').error_function;
const users = require('../db/models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


exports.login = async function (req,res){
try {
    let email = req.body.email;
    console.log("email : ", email);

    let password = req.body.password;
    console.log("password : ", password);

    let user = await users.findOne({email}).populate('user_type');
        console.log("user : ", user);


    if(user){
        let db_password = user.password;
        console.log("db_password  : ",db_password);

        let passwordMatch = bcrypt.compareSync(password,db_password);
        console.log("passwordMatch",passwordMatch);

        if(passwordMatch){
            let token =jwt.sign({user_id : user._id},process.env.PRIVATE_KEY,{expiresIn : "10d"});

            let id = user._id;
            console.log('id',id);
            let user_type  = user.user_type;
            console.log('user_type',user_type)

            let token_data = {
                token,
                id,
                user_type
            }


                
        let response = success_function({
            success: true,
            statuscode: 200,
            data : token_data,
            message: "successfully Logined.....",
        });
        res.status(response.statuscode).send(response);
        return;

    }else{
        let response = error_function({
            success: false,
            statuscode: 400,
            message: "Invalid password.....",
        });
        res.status(response.statuscode).send(response);
        return;

    }}else {
        let response = error_function({
            statusCode : 404,
            message : "User not found",
        });

        res.status(response.statuscode).send(response);
        return;
    }

    } catch (error) {
        console.log("error : ", error);

        let response = error_function({
            success: false,
            statuscode: 400,
            message: "not added..",
        });
        res.status(response.statuscode).send(response)
        return;
    }
}



