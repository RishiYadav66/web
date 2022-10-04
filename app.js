var express = require ("express");
var path = require('path');
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const app = express();


app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/db',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/sign_up",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var password = req.body.password;

    var data = {
        "name": name,
        "email" : email,
        "phno": phno,
        "password" : password
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('signup_success.html')

})




console.log("Listening on PORT 3000");

app.use('*/assets',express.static(path.join(__dirname,'public/assets')));
app.use('*/vendor',express.static(path.join(__dirname,'public/vendor')));

//or

// app.use('*/images',express.static(path.join(__dirname, 'public/assets/images')));
// app.use('*/js',express.static(path.join(__dirname, 'public/assets/js')));
// app.use('*/css',express.static(path.join(__dirname, 'public/assets/css')));
// app.use('*/fonts',express.static(path.join(__dirname, 'public/assets/fonts')));
// app.use('*/bootstrap',express.static(path.join(__dirname, 'public/vendor/bootstrap')));
// app.use('*/jquery',express.static(path.join(__dirname, 'public/vendor/jquery')));

 
app.get("/",function(req,res){
    res.sendFile(__dirname+"/homepage_1.html");
});
app.listen(3000,function(){
  console.log("Server is running on port 3000")
})   