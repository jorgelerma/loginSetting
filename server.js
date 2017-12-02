var express = require('express');
//var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();

var user_name;
var password;

// ****************** ADDED BEGIN
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

var bcrypt = require('bcrypt');

var http = require('http');
var fs = require('fs');

var express = require('express');
var app = express();
//var router = express.Router();
//var route = express.bodyParser();
var bodyParser = require('body-parser');
var routest = require('router');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

// ****************** ADDED ENDS

// create application/x-www-form-urlencoded parser
//var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', function(req,res){
  //res.sendfile("index.html");
  res.sendFile("/home/androidx/holacode/NodeJSz/TESTz/MongoDBs/index.html");
});

// POST /login gets urlencoded bodies
app.post('/login', function(req,res){
    user_name= req.body.username;
    password= req.body.password;

    console.log("5th name: " + user_name + " password: " + password);
      hashPassword(password);
    res.redirect('/loginz');
    //printOut();
    //res.sendFile("/home/androidx/holacode/NodeJSz/TESTz/MongoDBs/rebapusa.html");

    //res.end("yes");
    //console.log(req.body);
    //res.render('contact', {qs: req.query});
});

// ****************  BEGIN LOGINZ

app.get('/loginz', function(req,res){
  //res.sendfile("index.html");
  //console.log(" redirected to loginz ");
  res.sendFile("/home/androidx/holacode/NodeJSz/TESTz/MongoDBs/login.html");
  //var user_namep= req.body.usernamep;
  //var passwordp= req.body.passwordp;
  //console.log("@loginz name: " + user_namep + " password: " + passwordp);


});

  app.post('/loginz', function(req,res){
    //res.sendfile("index.html");
    console.log(" POST on loginz ");
    //res.sendFile("/home/androidx/holacode/NodeJSz/TESTz/MongoDBs/login.html");
    var user_namep= req.body.usernamep;
    var passwordp= req.body.passwordp;
    console.log("@loginz name: " + user_namep + " password: " + passwordp);



    if(passwordp === "ok"){
      res.redirect('/rebapusa');
    }

  //res.send('VERY SUCCESSFUL');
});


// ************************ END LOGINZ

app.get('/rebapusa', function(req,res){
  //res.sendfile("index.html");
  console.log(" redirected to rebapusa ");
  res.sendFile("/home/androidx/holacode/NodeJSz/TESTz/MongoDBs/rebapusa.html");
  //res.send('VERY SUCCESSFUL');
});

function printOut(){
console.log(" 3nd name: " + user_name + " password: " + password);
}



app.listen(3000, function(){
  console.log("Started on port 30000");
});



// ************************ ADDED HASHING BEGIN

function hashPassword(candidatePassword){

  //console.log=("What hashing receiving: " + candidatePassword);

  bcrypt.genSalt(11, function(err, salt){
    if(err){
      return console.log(err);
    }
    //console.log("This is the salt:")
    //console.log(salt);
    //console.log("\n")
    //var mySalt = "$2a$11$stdmF96LTLs.jZmxsdBab.";
    var mySalt = "$2a$11$stdmF96LTLs.jZmxsdBab.";

    //console.log("This is my salt: " + mySalt);

    bcrypt.hash(candidatePassword, mySalt, function(err, hashedPassword){
      if(err){
        return console.log(err);
      }

      //console.log("This is the hashedPassword: 111:" + hashedPassword);

      InsertPass(user_name, hashedPassword);
      //return hashedPassword;

      //console.log(hashedPassword);

    })

  });
}
// ************************ ADDED HASHING ENDS

// ************************ ADDED INSERTDB BEGINS

function InsertPass(user_name, value){

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  //var myobj = { name: "Company Inc" };
  var myobj = {namez: user_name, npassword: value };
  db.collection("customers").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});

}

// ************************ ADDED INSERTDB BEGINS
