const mysql = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();

// Initialize express app
const app = express();
app.use("/assets",express.static("assets"));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "J@yVeeN@thanael1234",
    database: "nodejs"
});

// connection to database
connection.connect(function(error){
    if (error) throw error
    else console.log("connected to database successfully✔!")
})

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/",encoder,function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    connection.query("select * from login_user where user_name = ? and user_pass = ?",
    [username,password],function(error,result,fields){
        if (result.length > 0) {
            res.redirect("/welcome");
         } else{
            res.redirect("/");
        }
        res.end();
    })
})

//login success
app.get("/welcome",function(req,res){
    res.sendFile(__dirname + "/welcome.html");
})

// set app port
app.listen(4560); 