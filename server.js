var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var mongoose = require('mongoose');
mongoose.set('strictQuery', false);

//FS
var fs = require("fs");
var server = require("http").Server(app);
server.listen( process.env.PORT || 3000);
io = require("socket.io")(server);
app.io = io;

var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

loadConfigFile('config.json');

// Functions
function loadConfigFile(file){
    var obj;
    fs.readFile(file, 'utf8', function(err, data){
        if(err) throw err;
        obj = JSON.parse(data);
        var dbString = "mongodb://localhost:27017/ServerAPI_01";
        mongoose.connect(dbString, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(()=>{
            console.log("Mongobd connect sucessfully.");
            require("./routes/main")(app, obj, randomString);
        })
        .catch((e)=>{console.log("Mongodb connect error!!! " + err)});
    });
}


function randomString(length){
    var result = "";
    var array = ["a", "A", "b", "B", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "y", "w", "t", "u", "v", "z", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    for(var i=1; i<=length; i++){
        result += array[Math.floor(Math.random() * array.length)];
    }
    return result;
}
