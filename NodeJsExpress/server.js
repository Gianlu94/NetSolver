var express = require ("express");

var app = express();
var bodyParser = require("body-parser");
var querystring = require("query-string");
var url = require("url");
var path = require("path");
var fs = require("fs");
var XmlWriter = require('xml-writer');

/*app.use(bodyParser.urlencoded({
  extended: false
}));*/
//configure express to use body-parser as midlle-ware
//app.use(bodyParser.json());

/*app.use(express.static(path.join(__dirname+"/NetSolver/web/bootstrap/css/bootstrap.min.css")));
app.use(express.static(path.join(__dirname+"/NetSolver/web/bootstrap/js/jquery-2.1.0.min.js")));
app.use(express.static(path.join(__dirname+"/NetSolver/web/css/geneal.css")));
app.use(express.static(path.join(__dirname+"/NetSolver/web/bootstrap/js/bootstrap.min.js")));
app.use(express.static(path.join(__dirname+"/NetSolver/web/js/HomePageNetSolver.js")));
app.use(express.static('/NetSolver/web/bootstrap'));
app.use(express.static('/NetSolver/web/css'));
app.use(express.static('/NetSolver/web/js'));
*/

//define static files
app.use(express.static(__dirname+"/NetSolver/web/css" ));
app.use(express.static(__dirname+"/NetSolver/web/js" ));


function createXmlProblem(arrayXml){
	/*var XmlProblem;
	 XmlProblem="<NetworkProblem>\n"
	 XMlProblem="
	 var eleMain = xml.ele('Networks');
	 for(var i = 0; i < arrayXml.length;i++) {
   		switch (array[i]){
   			case "-network" :
   		    	eleMain.ele('Network',{'address':array[i+1]});
   		    	break;
   		    case "-hosts-" :
   		    	eleMain.ele('Hosts',array[i+1]);
   		    	break;
   		    default : break;
   		}    	
    }*/
    var xw = new XmlWriter(true);
	xw.startDocument();
	xw.startElement('NetworkProblem');
	for(var i = 0; i < arrayXml.length;i++) {
		console.log(arrayXml[i]+"\n");
   		switch (arrayXml[i]){
   			case "-network" :
   				xw.startElement('Network');
   				xw.text(arrayXml[i+1]);
   		    	xw.endElement();
   		    	break;
   		    case "-hosts" :
   		    	xw.startElement('Hosts');
   				xw.text(arrayXml[i+1]);
   		    	xw.endElement();
   		    	break;
   		    default : break;
   		}    	
    }
	xw.endElement();
	xw.endDocument();
	fs.writeFile(__dirname+'/Traces/Trace1/trac1.xml', xw.toString(), function (err) {
  	if (err) return console.log(err);
  		console.log("Creation oks");
	});
	//console.log(xw.toString());
}
function DifficultyFile (difficulty,req,res) {
	console.log("PARAM "+ difficulty);
	switch (difficulty){
		case '1' :
			fs.readFile(path.join(__dirname+"/Traces/Trace1/trac1.txt"), function(err, file) {  
            if(err) {  
                // write an error response or nothing here  
                return;  
            }
            var array = file.toString().split(" ");
            var arrayClient ="";
            var arrayXml = "";
   		    for(var i = 0; i < array.length;i++) {
   		    	switch (array[i]){
   		    		case "-network-" :
   		    			array[i]="192.168.100.0/28";
   		    			arrayXml = arrayXml +"-network "+array[i];
   		    			break;
   		    		case "-hosts-" :
   		    			array[i]="5 hosts";
   		    			arrayXml = arrayXml +" -hosts "+array[i];
   		    			break;
   		    		default : 
   		    			break;
   		    	}
   		    	arrayClient = arrayClient +" "+array[i];
    		}
    		console.log(arrayXml);
    		createXmlProblem(arrayXml.split(" "));
            res.writeHead(200, { 'Content-Type': 'text/html' });  
            res.end(arrayClient.toString(), "utf-8");  
        });
		break;
		default : break;
	}
}
//manage  the request of a network problem
app.get("/Tracer", function(req,res){
	var url2 = url.parse(req.url);
	var queryObj = querystring.parse(url2.query);
	var obj = JSON.parse(queryObj.data);
	var difficulty = obj.difficulty;
	DifficultyFile(difficulty,req,res);
});

//load homePage
app.get("/NetSolver/web/homeNetSolver.html", function(req,res){
	res.sendFile(path.join(__dirname+"/NetSolver/web/homePageNetSolver.html"));
});

//server up
app.listen(3000, function(){
	  console.log('Server up: http://localhost:3000');
});

