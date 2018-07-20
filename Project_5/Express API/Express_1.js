//1.Search on the basis of city.
//Try with 'manali'


var express = require('express');
var app=express();
var bodyParser = require('body-parser');
var cors = require('cors');
app.use(bodyParser.json());
var mongojs=require('mongojs');
var db = mongojs('Project',['hotel','contactus']);
app.use(cors())
app.use(express.static(__dirname)); //to tell server that this is root folder


var events=require('events');
var em=new events.EventEmitter();
var fs = require('fs');

//Service call for list users

var msg="Directory Name: "+ __dirname + "\n" +
         "StartTimeStamp: "+(new Date(Date.now()+"\n"))+
         "File Name: "+__filename+"\n"+
         "Process Version: "+process.version+"\n"+
         "Process Time: "+process.uptime()+"\n"+
         "Memory Use: "+JSON.stringify(process.memoryUsage())+"\n";
var write=function()
{
  try{
  fs.appendFile("D:\\Angular\\logFile.txt", msg+"*************************************************************"+"\n"+"\n" , function(err)
  {
    if(err)
    { return console.log(err);
    }

  });
  }
	catch(err){}
};

//Adding and creating log files

var logger=function()
{
  em.on('error',function(err){
   console.error('Error is of ',err);
   });
   em.on('event1',write);
   em.emit ('event1');
};


app.get('/list',function(req,res){
		db.hotel.aggregate({$limit:500},function(err,docs){res.json(docs);
})
logger(); 
}); 

//Reviews fetched from contactus collection

app.get('/list/review',function(req,res){
		db.contactus.aggregate([{$sort:{_id:-1}}],function(err,docs){res.json(docs);
})
logger(); 
}); 

//Retrieving hotel on the basis of unique ID

app.get('/list/:id',function(req,res){
		db.hotel.aggregate([{$match:{$and:[{"property_id":parseInt(req.params.id)}]}},
	{$project:{_id:0}}],
	function(err,docs){res.json(docs);
})
logger(); 
});

//Searching by city

app.get('/list/city/:city',function(req,res){
		db.hotel.aggregate([{$match:{$and:[{"city":req.params.city}]}},
	{$project:{_id:0}}],
	function(err,docs){res.json(docs);
})
logger(); 
});


//Searching by hotel name

app.get('/list/hotel/:hotel',function(req,res){
		db.hotel.aggregate([{$match:{$and:[{"property_name":req.params.hotel}]}},
	{$project:{_id:0}}],
	function(err,docs){res.json(docs);
})
logger(); 
});

//Searching by city and hotel name

app.get('/list/cityhotel/:city/:hotel',function(req,res){
		db.hotel.aggregate([{$match:{$and:[{"city":req.params.city},{"property_name":req.params.hotel}]}},
	{$project:{_id:0}}],
	function(err,docs){res.json(docs);
})
logger(); 
});


//Search by hotel star rating

app.get('/list/rating/:rating',function(req,res){
		db.hotel.aggregate([{$match:{$and:[{"hotel_star_rating":{$gte:parseInt(req.params.rating)}}]}},
	{$project:{_id:0}}],
	function(err,docs){res.json(docs);
})
logger(); 
});

//Search by city and star rating

app.get('/list/cityrating/:city/:rating',function(req,res){
		db.hotel.aggregate([{$match:{$and:[{"city":req.params.city},{"hotel_star_rating":{$gte:parseInt(req.params.rating)}}]}},
	{$project:{_id:0}}],
	function(err,docs){res.json(docs);
})
logger(); 
});

//Search by hotel name and Star rating

app.get('/list/hotelrating/:hotel/:rating',function(req,res){
		db.hotel.aggregate([{$match:{$and:[{"property_name":req.params.hotel},{"hotel_star_rating":{$gte:parseInt(req.params.rating)}}]}},
	{$project:{_id:0}}],
	function(err,docs){res.json(docs);
})
logger(); 
});


//Search by city , star rating and hotel name

app.get('/list/cityhotelrating/:city/:hotel/:rating',function(req,res){
		db.hotel.aggregate([{$match:{$and:[{"city":req.params.city},{"property_name":req.params.hotel},{"hotel_star_rating":{$gte:parseInt(req.params.rating)}}]}},
	{$project:{_id:0}}],
	function(err,docs){res.json(docs);
})
logger(); 
});


app.post('/list', function(req, res){
	db.contactus.insert({name:req.body.name, rate:parseInt(req.body.rate), subject:req.body.subject,message:req.body.message},function(err,docs){
		if(err)
		   console.log(err);
		else
		   res.json(docs);
	})
logger(); 
});

app.listen(3000);
console.log("Running on port 3000");

