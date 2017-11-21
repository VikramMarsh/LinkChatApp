var express = require('express');
var router=express.Router();
var UserModel=require('./../models/Users');

router.get('/getusers',(req,res)=>{
		console.log("get request")
	UserModel.find({},'firstName',function(err,users){
		if(err)
			res.status(500).json({Error:err});
		else
			res.status(200).json({users:users});
	});
});

module.exports=router;