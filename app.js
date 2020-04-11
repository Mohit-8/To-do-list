//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var items = ["Brush Teeth","Take bath","Breakfast"];
var workitems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/", function(req, res) {
  var today = new Date();

  var options = {
    weekday : "long",
    day: "numeric",
    month: "long"

  };

  var day = today.toLocaleDateString("en-us",options);


  res.render("list",{listTitle : day, newListItems : items });
});

app.post("/",function(req,res){
  var item = req.body.newItem;

  if(req.body.list == "Work")
  {
    workitems.push(item);
    res.redirect("/work");

  }else{
    items.push(item);
    res.redirect("/");
  }



});

app.get("/work",function(req,res){
  res.render("list",{listTitle : "Work List" , newListItems: workitems});
});



app.listen(3000, function() {
  console.log("server has started on port 3000");
});
