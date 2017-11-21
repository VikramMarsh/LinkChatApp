var express = require('express');
var router=express.Router();
var UserModel=require('./../models/Users');

router.post('/load',(req,res)=>{
	const {email}=req.body;
	UserModel.findOne({email:email},(err,data)=>{
		if(err)
			res.status(401).json({error:'User not found'})
		else
			res.status(200).json(data);
	});
});


router.post('/update',(req,res)=>{
	const {email,firstName,lastName,nickName,address,number,country,state,city,hobbies,interest}=req.body;
	UserModel.findOneAndUpdate({email:email},
		{$set:{firstName:firstName,
			lastName:lastName,
			userName:nickName,
			address:address,
			number:number,
			country:country,
			state:state,
			city:city,
			hobbies:hobbies,
			interest:interest
		}},{new:true},(err,doc)=>{
			if(err)
				res.status(500).json({error:err});
			else
				res.status(200).json(doc);
		});

});

module.exports=router;