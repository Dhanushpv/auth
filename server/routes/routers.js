const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const accessControl =require('../util/access-control').accessControl

function  setAccessControl(access_types){
    return(req,res,next)=>{
        accessControl(access_types,req,res,next);
    }

}


router.post('/user',setAccessControl("1"),userController.create1);
router.get('/user',setAccessControl("1"),userController.getall);
router.get('/users/:id',setAccessControl("*"),userController.getsingle);
router.put('/singleUpdate/:id',setAccessControl("*"),userController.update);
router.delete('/userDelete/:id',setAccessControl("*"),userController.delete);

module.exports = router;