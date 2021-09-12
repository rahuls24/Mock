var express=require("express");
var router=require("./routes/router");
var bodyParser=require("body-parser");
var errorLogger=require("./utilities/errorLogger");
//var requestLogger=require("./utilities/requestLogger");

var app=express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//app.use(requestLogger);
app.use("/",router);
app.use(errorLogger);

app.listen(4000);
console.log("Server listening at port 4000");