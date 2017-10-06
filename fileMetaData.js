'use strict';
// init project
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var fs = require('fs');
//Multer is a node.js middleware for handling multipart/form-data, 
//which is primarily used for uploading files. It is written on top of busboy for maximum efficiency.
var multer = require('multer');
var upload = multer({dest:__dirname}); //from multer documetation
var app = express();

app.use(bodyParser.json());
app.use(cors());

//action for the form - from multer documentation
app.post("/upload", upload.single('selection'), function(req, res, next) {
    return res.json("File size is " + req.file.size + " bytes");
});

// Set route to package.json file
app.route('/_api/package.json')
    .get(function(req, res, next) {
        console.log('requested');
        fs.readFile(__dirname + '/package.json', function(err, data) {
            if (err) return next(err);
            res.type('txt').send(data.toString());
        });
    });

//allow node to find public folder
app.use('/public', express.static(process.cwd() + '/public'));

//path to index file
app.route('/')
    .get(function(req, res) {
        res.sendFile(process.cwd() + '/views/index.html');
    })

//listen to process.env.PORT which is glitch.com
app.listen(process.env.PORT, function() {
    console.log('Node.js listening ...');
});

