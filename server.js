'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var bodyParser=require('body-parser');
var dns = require('dns');
var cors = require('cors');

var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
mongoose.connect(process.env.MONGO_URI);

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here
app.use(bodyParser.urlencoded({extended: false}));

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

  
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.listen(port, function () {
  console.log('Node.js listening ...');
});


var short_url=0;
var urls=[];
app.route('/api/shorturl/new')
  .post((req,res)=> {  if (req.body.url.slice(0,7)==='http://'){
                          req.body.url=req.body.url.slice(7);
                        } else if (req.body.url.slice(0,8)==='https://'){
                          req.body.url=req.body.url.slice(8);
                      }
                      dns.lookup(req.body.url,(err,add)=>{
                        if (err) {
                          res.json({"error":"invalid URL"})
                        } else if (urls.req.body.url){
                          res.json({"original_url": req.body.url,
                          "short_url":urls.req.body.url});
                        } else if (!urls.req.body.url){
                          short_url++;
                          urls.push({req.body.url: short_url});
                        };
                      });
                    });

