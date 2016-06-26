var express = require ("express");

var app = express();
var bodyParser = require("body-parser");
var path = require("path");


//My modules

var checkSolution = require("./check_solution.js");
var networkProblem = require("./problem.js");
var creationProblem = require("./create_problems.js");

var difficultyP="";


app.use(bodyParser.text());



//define static files
app.use(express.static(__dirname+"/../web/prefabs/css" ));
app.use(express.static(__dirname+"/../web/js" ));


//manage  the request of a network problem
app.get("/Tracks", function(req,res){
	difficultyP = networkProblem.extractDifficulty(req,res);
	creationProblem.difficultyFile(difficultyP, req, res);
});

//solution of  network problem
app.post("/Solution", function(req, res){
	console.log("I'm checking solution");
	checkSolution.checkUserSolution(req,res,creationProblem.problemPath);
});

//load homePage
app.get("/NetSolver/web/homeNetSolver.html", function(req,res){
	console.log("CSS :" +(path.join(__dirname+"/../web/prefabs/css" )));
	console.log("Taken : "+ (path.join(__dirname+"/../web/homePageNetSolver.html")));
	res.sendFile(path.join(__dirname+"/../web/homePageNetSolver.html"));
});

//server up
app.listen(3000, function(){
	  console.log('Server up: http://localhost:3000');
});

