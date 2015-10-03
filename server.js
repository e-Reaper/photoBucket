var express = require('express');
var mj = require('mongojs');
var app = express();
var db = mj('photobucket',['photobucket']);
var bodyparser = require('body-parser');

app.use(express.static(__dirname+"/public"));
app.use(bodyparser.json());

app.get('/photos', function(req, res) {  // handle the get request and response with data 
	//console.log('Request');
    db.photobucket.find(function(err,docs){
		//console.log(docs);
		res.json(docs);
	});
});

app.post('/addphoto',function(req,res){  // handle the post request and add the photo and label passed in parameter
	//console.log(req.body);
	db.photobucket.insert(req.body,function(err,doc){
		res.json();
	});
});

app.listen(3000);
console.log('Listening on port 3000...');