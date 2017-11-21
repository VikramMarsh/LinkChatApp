var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var Schema=mongoose.Schema;

var Messages=new Schema({
	email:{type:String,required:true},
	messages:[{
		to:{type:String},
		from:{type:String},
		message:{type:String},
		time:{type:String},
		date:{type:String},
		baseDate:{type:Date}
	}]
});

module.exports=mongoose.model('MessagesModel',Messages)