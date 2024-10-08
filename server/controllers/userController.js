let users = require('../db/models/user');
const usertype = require('../db/models/user_type');
const { success_function, error_function } = require('../util/userResponse')
const bcrypt =require('bcryptjs')
    
exports.create1 = async function (req, res) {

    try {
        let body = req.body;
        console.log('body',body);

        let password = body.password;

        let user_type = await usertype.findOne({user_type : body.usertype});
        console.log("user type" , user_type);

        let id = user_type._id


        body.user_type=id


        let salt = bcrypt.genSaltSync(10);
        console.log('salt',salt);

        let hashed_password = bcrypt.hashSync(password,salt);
        console.log('hashed_password' ,hashed_password)

        body.password=hashed_password


        let userData = await users.create(body);
        console.log('userData',userData);

        let response = success_function({
            success: true,
            statuscode: 200,
            message: "successfully added..",
            data:userData
            
        })
        res.status(response.statuscode).send(response)
        return;

    } catch (error) {

        console.log("error : ", error);
        let response = error_function({
            success: false,
            statuscode: 400,
            message: "error"
            
        })
        res.status(response.statuscode).send(response)
        return;
    }
}

exports.getall= async function(req,res){
    try {
       getuserData= await users.find();
       console.log("getuserData",getuserData);
       let response = success_function({
        success: true,
        statuscode: 200,
        message: "successfully get all data ..",
        data :getuserData
    })
    res.status(response.statuscode).send(response)
    return;

} catch (error) {

    console.log("error : ", error);
    let response = error_function({
        success: false,
        statuscode: 400,
        message: "error"
    })
    res.status(response.statuscode).send(response)
    return;
}
}

exports.getsingle = async function (req,res){
    try {

        Singleid = req.params.id
        console.log("Singleid",Singleid);

        SingleData = await users.findOne({_id :Singleid});
        console.log("SingleUser",SingleData);

        let response = success_function({
         success: true,
         statuscode: 200,
         data : SingleData,
         message: "successfully get the single data.."
     })
     res.status(response.statuscode).send(response)
     return;
 
 } catch (error) {
 
     console.log("error : ", error);
     let response = error_function({
         success: false,
         statuscode: 400,

         message: "error"
     })
     res.status(response.statuscode).send(response)
     return;
 }

}

exports.update = async function (req,res){
    
    try {
        let body = req.body;
        console.log("body",body);



        let data= {
            name : body.name,
            email : body.email,
            phoneno : body.phoneno,
            password : body.password,
            usertype : body.user_type
        }

        
    updateId = req.params.id 
    console.log("updateId",updateId);

    let update_employee = await users.updateOne({_id : updateId},data);
    console.log("updateemployee",update_employee);

    let response = success_function({
        success: true,
        statuscode:200,
        data:update_employee,
        message: "successfully Updated..",
        
    })
    res.status(response.statuscode).send(response)
    return;

    

    } catch (error) {

    console.log("error : ", error);
    let response = error_function({
        success: false,
        statuscode: 400,
        message: "error"
    })
    res.status(response.statuscode).send(response)
    return;
}


}

exports.delete = async function (req,res){
    try {
        DeleteId = req.params.id 
        console.log("DeleteId",DeleteId);

        deleteData = await users.deleteOne ({_id : DeleteId});
        console.log("deleteData",deleteData);

let response = success_function({
        success: true,
        statuscode: 200,
        message: "successfully deleted.."
    })
    res.status(response.statuscode).send(response)
    return;

    } catch (error) {

    console.log("error : ", error);
    let response = error_function({
        success: false,
        statuscode: 400,
        message: "error"
    })
    res.status(response.statuscode).send(response)
    return;
}
}


