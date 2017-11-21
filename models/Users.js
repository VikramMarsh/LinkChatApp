var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var Schema=mongoose.Schema;

var Users=new Schema({
	firstName:{type:String,required:true},
	lastName:{type:String},
	email:{type:String,required:true,unique:true},
	password:{type:String,required:true},
	userName:{type:String},
	address:{type:String},
	number:{type:Number},
	country:{type:String},
	state:{type:String},
	city:{type:String},
	hobbies:{type:String},
	interest:{type:String}
});

module.exports=mongoose.model('UserModel',Users);
