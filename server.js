

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
var request = require('request');

var fetch = require('node-fetch');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

require('./app/routes')(app, {});
app.listen(3000, function(){
  console.log("Started on port 3000");
});


// ****************** ADDED ENDS

// create application/x-www-form-urlencoded parser
//var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', function(req,res){
  //res.sendfile("index.html");

  res.sendFile("/home/androidx/holacode/NodeJSz/TESTz/MongoDBs/index.html");


});

app.get('/quotez', function(req,res){
  //res.sendfile("index.html");

  var objt = '';
  //request('http://quotes.stormconsultancy.co.uk/random.json', function (error, response, body) {
  request('http://quotes.stormconsultancy.co.uk/random.json', function (error, response, body) {

    //request('http://www.akfaf.com', function (error, response, body) {

    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode);
    objt = JSON.parse(body);
    console.log(objt.quote);

    var tmp2 = '';

    //var vQuote = fetchquote();

      fetchquote(function(infoz){

        //tmp2 = infoz;
        console.log("This is ******* infoz: ");
        console.log("infoz: " + infoz.title);
        console.log(infoz);

        //tmp2 = infoz;
        toPrint(infoz);

      });
    });

    function toPrint(tmp3){
      console.log("This is TMP3z: ");
      console.log(typeof(tmp3));
      console.log(tmp3.length);
      console.log(tmp3);
      tmp2 = tmp3;

      var longQuote1 = "<html><body><center><h2>Programming Quotes API: </h2> </br> <h3><q>" + objt.quote + "</q></h3></center></br></br>";
      var longQuote2 = "</br></br><center><h2>JSONPlaceholder's API </h2></br><h3>" + tmp3.body + "</h3></br></br></br><p> &copy; 2017 Jorge Lerma </p></center></body></html>";
      var totalQuote = longQuote1 + longQuote2;
      res.send(totalQuote);

      }

      //console.log("222222222222222222  This is TMP2z: ");
      //console.log(typeof(tmp2));
      //console.log(tmp2);







    //console.log("This is vQuote: ");
    //console.log(vQuote);

    //res.send(vQuote);
    //var longQuote = "<h1>Quote of the day </h1> </br> <h3><q>On two occasions I have been asked, Pray, Mr. Babbage, if you put into the machine wrong figures, will the right answers come out? I am not able rightly to apprehend the kind of confusion of ideas that could provoke such a question. </q> </h3>";


});

// $$$$$$$$$$$$$$$$$$$$   toPrint fucnt

function toPrint(toprintz){
  console.log("This is TMP2z: ");
  console.log(typeof(tmp2));
  console.log(tmp2.length);
  console.log(tmp2);
  }

  // $$$$$$$$$$$$$$$$$$$$   toPrint fucnt



// POST /login gets urlencoded bodies
app.post('/login', function(req,res){
    user_name= req.body.username;
    password= req.body.password;

    //##########  CHECK FOR NAME EMPTY BEGIN
    if(user_name === undefined || user_name === ''){
      console.log(" user_name is empty");
    }
    else{

    console.log("5th name: " + user_name + " password: " + password);
      hashPassword(password);
    res.redirect('/loginz');

    }
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

var returnValue;

  app.post('/loginz', function(req,res){
    //res.sendfile("index.html");
    //console.log(" POST on loginz ");
    var returnedHash = '';
    var returnValue = '';
    //res.sendFile("/home/androidx/holacode/NodeJSz/TESTz/MongoDBs/login.html");
    var user_namep= req.body.usernamep;
    var passwordp= req.body.passwordp;
    console.log("@loginz name: " + user_namep + " password: " + passwordp);

        console.log(typeof(user_namep));
      //##########  CHECK FOR NAME EMPTY BEGIN
      if(user_namep === undefined || user_namep === ''){
        console.log(" user_namep is empty");
      }
      else{


     //tofinds(user_namep);
     // BEGIN SYNC
     tofinds(user_namep, function(data){
       returnValue = data;
       console.log("!!!!!!!!! this returnValue @ callback");
       //console.log("oook: " + returnValue);
       console.log(returnValue[0]);   //  NAME
       console.log(returnValue[1]);   //  HASHED PASS
       console.log(returnValue[2]);   //  SALT

       //returnedHash = "";
        hashPassword(passwordp, returnValue[2], function(data){
         returnedHash = data;
         //console.log("88888888   THIS IS RETURNEDHASH: ");
         //console.log(returnedHash);


         console.log("99999999   THIS IS RETURnedVALUE: ");
         console.log(returnValue[1]);
         console.log("88888888   THIS IS RETURNEDHASH: ");
         console.log(returnedHash);

         if(returnValue[1] === returnedHash){
           //res.redirect('/rebapusa');
           console.log(" PASSWORD MATCHES \n ");
           //res.redirect('/rebapusa');

           res.redirect('/quotez');
         }else{

           console.log(" WRONG  PASSWORD  \n ");
         }

       });


     });

     //##########  CHECK FOR NAME EMPTY ENDS
   }








    //console.log("RETURN VALUE: ");
    //console.log(returnValue);




  //res.send('VERY SUCCESSFUL');
  });

  //#### MIDDLE_HANDLER BEGIN

  /*

  app.get('/middlez', function(req,res){
    //res.sendfile("index.html");
    console.log(" THIS IS MIDDLEZ *************");
    //res.sendFile("/home/androidx/holacode/NodeJSz/TESTz/MongoDBs/login.html");



    var returnValuez = togetValues()

    console.log("RETURN VALUE middlez: ");
    console.log(returnValuez);

    res.redirect('/rebapusa');

  //res.send('VERY SUCCESSFUL');
  });
  */

  //#### MIDDLE_HANDLER ENDS


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






// ************************ ADDED HASHING BEGIN

function hashPassword(candidatePassword, saltp, hashReturnfunc){

  //console.log=("What hashing receiving: " + candidatePassword);
  var mySalt;

  //console.log("###############  THE SALT: " + saltp);
  //console.log(saltp);

  bcrypt.genSalt(11, function(err, salt){
    if(err){
      return console.log(err);
    }
    //console.log("This is the salt:")
    //console.log(salt);
    //console.log("\n")
    //var mySalt = "$2a$11$stdmF96LTLs.jZmxsdBab.";
    if(saltp === undefined){

      mySalt = "$2a$11$stdmF96LTLs.jZmxsdBab.";
    }else{
      mySalt = saltp;
    }

    var theSalt = mySalt;

    //console.log("This is my salt: " + mySalt);
    bcrypt.hash(candidatePassword, mySalt, function(err, hashedPassword){
      if(err){
        return console.log(err);
      }

      //console.log("This is the hashedPassword: 111:" + hashedPassword);

      if(saltp === undefined){
        InsertPass(user_name, hashedPassword, theSalt);
        //return hashedPassword;

      }else{
        hashReturnfunc(hashedPassword);
        //return hashedPassword;
        //console.log(hashedPassword);

      }




    })

  });
}
// ************************ ADDED HASHING ENDS

// ************************ ADDED INSERTdb BEGINS

function InsertPass(user_name, value, theSalt){

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  //var myobj = { name: "Company Inc" };
  var myobj = {namez: user_name, npassword: value, thesaltz: theSalt };
  db.collection("customers").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});

}

// ************************ ADDED INSERTdb ENDS

var gval1;
var gval2;

function togetValues(){

  var Array1 = [gval1, gval2];
  //console.log("This is Array1 at togetValues: " + Array1);

  return Array1;

}

// ************************ ADDED MIDDLE_RETRIEVEdb_BEGINS
function toPrints(valuex1, valuex2){

gval1 = valuex1;
gval2 = valuex2;
//var length = valuex.length;
//console.log("toPrint function: "+ length);
console.log("TOPRINTZ NAMEZ: " + valuex1 + " PASS: " + valuex2);
console.log("TOPRINTZ typeof: " + typeof(valuex));

var Array1 = [gval1, gval2];
console.log("This is Array1: " + Array1);

//return Array1;

}

// ************************ ADDED MIDDLE_RETRIEVEdb_END


// ************************ ADDED RETRIEVEdb BEGINS

function tofinds(stringName, callback){


MongoClient.connect(url, function(err, db) {

  var resultArray = [];
  if (err) throw err;
  db.collection("customers").find({"namez": stringName}).toArray(function(err, result) {
  //db.collection("customers").find({"namez": stringz}).toArray(function(err, result) {
    if (err){ throw err;}
    else{
      //console.log("This is array result: " + result[0]);
      //console.log(result[0].namez);
      //toPrints(result[0].namez, result[0].npassword);
      //var tmp = toPrints(result[0].namez, result[0].npassword);

      var tmpz = [result[0].namez, result[0].npassword, result[0].thesaltz];
      callback(tmpz);

      //var passArray = [result[0].namez, result[0].npassword];
      //console.log(passArray);
      //return passArray;

        /*
      result.forEach(function(doc, err){

        //assert.equal(null, err);
        resultArray.push(doc);

        resultArray.forEach(function printer(obprint){
          console.log("obprint: ");
          console.log(obprint);


        });
        //toPrints(resultArray);
      });
      */

      db.close();

      //return tmp;
      //console.log(" RIGHT BEFORE RETURN: ")
      //console.log(result[0].namez);
      //var passArray = [result[0].namez, result[0].npassword];
      //console.log(passArray);
      //return passArray;
    }

  });
});

  //console.log("s "+results);
}


function fetchquote(resp){
  fetch('http://jsonplaceholder.typicode.com/posts/1')
  .then(function(data){
    return data.json();
  }).then(function(parsed){
    resp(parsed);
  });




  /*
  fetch('http://jsonplaceholder.typicode.com/posts/1').then(function(response){
    return response.json();}).then(function(json){



       tmpz = json;
       console.log("This is at fetchquote funct: ");
       console.log(json);
       passer(json);

      });
      */

      //return tmpz;
}  // end fetchqutoe function


// ************************ ADDED RETRIEVEdb ENDS
