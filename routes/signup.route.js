let express=require('express');
let router=express.Router();
let validations= require('./../js/validations/signupValidation');
var UserModel=require('./../models/Users');
var MessagesModel=require('./../models/Messages.model');
var bcrypt = require('bcrypt');
var isEmpty=require('lodash/isEmpty');


function Uniqueness(data,othervalidations) {

	const {errors}=othervalidations(data);

	return UserModel.findOne({email:data.email})
			.then((user)=>{
				if(user){
					errors.email="Email Already Exist";
				}
				return {
					errors,
					isValid: isEmpty(errors)
				}
			});
	}

router.post('/signup',(req,res)=>{
	
	const {errors,isValid}=Uniqueness(req.body,validations).then(({errors,isValid})=>{

		if(!isValid){
		res.status(400).json(errors);
		}
		else{
		const {firstName,lastName,email,password}=req.body;

		const password_digest=bcrypt.hashSync(password,10);

		var User=new UserModel({firstName:firstName,
			lastName:lastName,
			email:email,
			password:password_digest,
			userName:"NA",
			address:"NA",
			number:"0",
			country:"NA",
			city:"NA",
			state:"NA",
			hobbies:"NA",
			interest:"NA"});

		var Messages=new MessagesModel({
			email:email
		});

		User.save((err,data)=>{

			if(err){
				res.status(500).json({serverError:err});
			}
			else{

				Messages.save((err,data)=>{
					if(err)
						res.status(500).json({serverError:err})
					else
						res.status(200).json({success:true});	
				});	
				
			}

		});
		
	}
	});
});

module.exports=router;