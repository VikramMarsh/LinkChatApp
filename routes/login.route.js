var express = require('express');
var router=express.Router();
var UserModel=require('./../models/Users');
var bcrypt = require('bcrypt');
var jwt=require('jsonwebtoken');
var config=require('./../config');

router.post('/login',(req,res)=>{

	const {email,password}=req.body;

	UserModel.findOne({email:email})
		.then((user)=>{
			if(user){

			if(bcrypt.compareSync(password,user.password)){
				
				const token=jwt.sign({id:user._id,
					email:user.email,username:user.firstName},config.secret);
				res.status(200).json({success:true,jwtToken:token});
			}

			else{
				res.status(401).json({globalError:"Invalid Credentials"});		
			}
		}

		else
		{
			res.status(401).json({globalError:"Invalid Credentials"});
		}

		});

});

module.exports=router;