var express = require('express');
var router=express.Router();
var MessagesModel=require('./../models/Messages.model');

router.post('/messages',(req,res)=>{
		MessagesModel.findOneAndUpdate({email:req.body.email},
			{$push:{"messages":{
				to:req.body.to,
				from:req.body.from,
				message:req.body.message,
				time:req.body.time,
				date:req.body.date,
				baseDate:req.body.baseDate
			}}},
			{safe: true, upsert: true, new : true},
			(err,doc)=>{
				if(err)
					res.status(500).json({failed:err})
				else
					res.status(200).json({success:"message added"})
			}
			);
});

router.post('/getmessages',(req,res)=>{
	MessagesModel.aggregate([
		{$match:{email:req.body.email}},
		{$unwind:'$messages'},
		{$match:{$or:[{'messages.to':req.body.to,'messages.from':req.body.from},{'messages.to':req.body.from,'messages.from':req.body.to}]}},
		{$group:{_id:'$_id',messages:{$addToSet:"$messages"}}}
		],(err,doc)=>{
			if(err)
				console.log(err);
			else{
				console.log(doc)
				if(doc.length==0)
					res.status(200).json(doc);
				else{
				doc[0].messages.sort((date1,date2)=>{
					// return new Date('1970/01/01 ' + a.time) - new Date('1970/01/01 ' + b.time);
					if(date1.baseDate>date2.baseDate) return 1;
					if(date1.baseDate<date2.baseDate) return -1;
					return 0
				});
				res.status(200).json(doc);
			}
			}
		})


	// MessagesModel.findOne({email:req.body.email},'messages',(err,doc)=>{
	// 	console.log(doc)
	// 		if(err)
	// 			res.status(500).json({Error:err})
	// 		else
	// 			res.status(200).json(doc);
	// })
})

module.exports=router;