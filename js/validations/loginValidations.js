let Validator=require('validator');
let isEmpty=require('lodash/isEmpty');

function validateInput(data) {
	let errors={};

	if(!Validator.isEmail(data.email))
		errors.email="Email is invalid";

	if(Validator.isEmpty(data.email))
		errors.email='This field is required';

	if(Validator.isEmpty(data.password))
		errors.password='This field is required';


	return{errors,
		isValid:isEmpty(errors)
	};	
}

module.exports=validateInput;