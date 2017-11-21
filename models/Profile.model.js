var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var Schema=mongoose.Schema;

var Profile=new Schema({
	email:{type:String,required:true},
	firstName:{type:String,required:true},
	lastName:{type:String},
	userName:{type:String},
	address:{type:String},
	number:{type:Number},
	country:{type:String},
	state:{type:String},
	city:{type:String},
	hobbies:{type:String},
	interest:{type:String}
});

module.exports=mongoose.model('ProfileModel',Profile);