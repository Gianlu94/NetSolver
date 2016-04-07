var express = require ("express");

var app = express();
var bodyParser = require("body-parser");
var querystring = require("query-string");
var url = require("url");
var path = require("path");
var fs = require("fs");
var XmlWriter = require('xml-writer');
var xmlparser = require('express-xml-bodyparser');
var xml2js = require('xml2js');
var util = require('util');
var xpath = require("xpath");
var DOMParser = require('xmldom').DOMParser
var Netmask = require('netmask').Netmask
var ipM = require("ip");

var parser = new xml2js.Parser();
var difficultyP="";

//app.use(xmlparser());
/*app.use(bodyParser.urlencoded({
  extended: false
}));
//configure express to use body-parser as midlle-ware
app.use(bodyParser.json());
*/
app.use(bodyParser.text());

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
		//console.log(arrayXml[i]+"\n");
   		switch (arrayXml[i]){
   			case "-network" :
   				xw.startElement('Network');
   				xw.text(arrayXml[i+1]);
   		    	xw.endElement();
   		    	break;
   		    case "-hosts" :
   		    	xw.startElement('Hosts');
   		    	//var numberHosts = Math.floor((Math.random() * 3) + 1);
   				xw.text(arrayXml[i+1]);
   				//console.log("***NNNNNH ",numberHosts);
   				//xw.text(numberHosts);
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
	console.log("Creation oks");
	//console.log(xw.toString());
}
function DifficultyFile (difficulty,req,res) {
	console.log("PARAM "+ difficulty);
	switch (difficulty){
		case '1' :
			fs.readFile(path.join(__dirname+"/Traces/Trace1/trac1.txt"), function(err, file) { 
			difficultyP="/Traces/Trace1/trac1.xml";
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
   		    			array[i]="192.168.100.000/28";
   		    			arrayXml = arrayXml +"-network "+array[i];
   		    			break;
   		    		case "-hosts-" :
   		    			var numberHosts = Math.floor((Math.random() * 3) + 1);
   		    			array[i]= numberHosts+" hosts";
   		    			arrayXml = arrayXml +" -hosts "+array[i];
   		    			break;
   		    		default : 
   		    			break;
   		    	}
   		    	arrayClient = arrayClient +" "+array[i];
    		}
    		//console.log(arrayXml);
    		createXmlProblem(arrayXml.split(" "));
            res.writeHead(200, { 'Content-Type': 'text/html' });  
            res.end(arrayClient.toString(), "utf-8");  
        });
		break;
		default : break;
	}
}

function checkIfIsValidAddress (ipA, htmlResponse,network){
	
	console.log("Network : ", network);
	var block = new Netmask(network);
	if (!(ipM.isV4Format(ipA))){
		htmlResponse = htmlResponse + "<li> Error : "+ipA + " is not a valid IPV4 Address</li>";		
	}
	else if(ipA == block.base){
		htmlResponse = htmlResponse + "<li> Error : "+ipA + " is the Network Address</li>";		
	}
	else if(ipA == block.mask){
		htmlResponse = htmlResponse + "<li> Error : "+ipA + " is the Netmask</li>";		
	}
	else if(ipA == block.broadcast){
		htmlResponse = htmlResponse + "<li> Error : "+ipA + " is the BroadCast Address</li>";		
	}
	else if(!block.contains(ipA)){
		htmlResponse = htmlResponse + "<li> Error : "+ipA + " doesn't belong to the network : " + network +"</li>";		
	} 
	console.log("Ipa : "+ ipA);  
	console.log("Base : "+ block.base);
	console.log("Last : "+ block.last);  
	console.log("Netmask : "+ block.mask);
	console.log("Broadcast : "+ block.broadcast);      
	console.log("Gateway : "+ block.last);   
	
	return htmlResponse
	//console.log("Block Base : ", block.base);
}

function checkDuplicateAddress (ipA, hostArray, hostArrayDuplicate){
	if (hostArray.indexOf(ipA) != -1){
		if (hostArrayDuplicate.indexOf(ipA) == -1){
			hostArrayDuplicate.push(ipA);
		}
	}
}

function checkIfIsValidNetmask (netmask, htmlResponse, network){
	var block = new Netmask(network);	
	if(netmask != block.mask){
		htmlResponse = htmlResponse + "<li> Error : "+netmask + " is not the Netmask</li>";		
	}
	return htmlResponse;
}


function checkUserSolution (req,res){
	var htmlResponse ="<h3>List of errors </h3>";
	var parser = new DOMParser();
	var userSFile = parser.parseFromString(req.body, "application/xml")
	switch (difficultyP) {
		case "/Traces/Trace1/trac1.xml":
			var passed = false;
			console.log("Problem oks");
			fs.readFile(path.join(__dirname+difficultyP), function(err, file) { 
            	if(err) {  
                	// write an error response or nothing here  
                	return;  
            	}else{
            		var fileString = file.toString();
            		var doc = parser.parseFromString(fileString, "application/xml");
            		var network = (xpath.select("//Network/text()",doc)).toString();
            		var hostP = (xpath.select("//Hosts/text()",doc)).toString();
            		var hostU = (xpath.select("//Number/text()",userSFile)).toString();
					//console.log("***Problem hosts "+ hostP );
            		//console.log("***User hosts "+ hostU );
            		if (hostP != hostU){
            			htmlResponse = htmlResponse + "<ul><li>Numbers of host is not equal</li>";
            		}
            		else {
		        			//var block = new Netmask(network);
		        			//console.log("***Rete " + block.mask);
			        		var listHosts = (xpath.select("//Host",userSFile));
			        		htmlResponse = "<ul>";
			        		var hostArray = [];
			        		var hostArrayDuplicate = [];
			        		//console.log("List hosts" + listHosts);
		        			for (var i = 0; i < hostP; i++){
		        				//console.log(listHosts[i].localName);
		        				var ipA = (xpath.select("//"+listHosts[i].localName+"/Ip",userSFile));
		        				var getW = (xpath.select("//"+listHosts[i].localName+"/Gateway",userSFile));
		        				var netM =	(xpath.select("//"+listHosts[i].localName+"/Netmask",userSFile));
		        				
		        				htmlResponse = checkIfIsValidAddress(ipA[i].firstChild.data,htmlResponse,network);
		        				htmlResponse = checkIfIsValidAddress(getW[i].firstChild.data,htmlResponse,network);
		        				htmlResponse = checkIfIsValidNetmask(netM[i].firstChild.data,htmlResponse,network)
		        				checkDuplicateAddress(ipA[i].firstChild.data,hostArray,hostArrayDuplicate);
		        				hostArray.push(ipA[i].firstChild.data);
		        				//var ip = (xpath.select("/"+listHosts[i].localName+"/Ip/text()",userSFile)).toString();
		        				//console.log("Host ip "+ i +"Ip address" + ipA[i].firstChild.data);
		        				//hostArray
            				}
            				//htmlResponse = htmlResponse + "</ul>";
            				if (hostArrayDuplicate.length !=0){
            					for (var i=0; i< hostArrayDuplicate.length ;i++){
            						htmlResponse = htmlResponse + "<li> The following ip address " + hostArrayDuplicate[i] + " appears more than one time</li>";
            					}
            				}
            				else{
            					htmlResponse = htmlResponse + "<h5>No errors occured</h5>";
            				}
            				htmlResponse = htmlResponse + "</ul>";
            	
            		}
            		
            		
            		//console.log("Document parsed ", doc);
            		//console.log("***Network "+ (xpath.select("//Network/text()",doc)).toString());
            		   //res.writeHead(200, { 'Content-Type': 'text/html' });  
            			res.send(htmlResponse);  
            		
            	}
            });
			break;
		default : 
			break;
	}
	console.log("*DDDD ",difficultyP);
}

//manage  the request of a network problem
app.get("/Tracer", function(req,res){
	var url2 = url.parse(req.url);
	var queryObj = querystring.parse(url2.query);
	var obj = JSON.parse(queryObj.data);
	var difficulty = obj.difficulty;
	DifficultyFile(difficulty,req,res);
});

//solution of  network problem
app.post("/Solution", function(req, res){
	/*console.log("Request received");
	console.log("Request"+req.body);
	parser.parseString(req.body, function (err, result) {
    	console.log(util.inspect(result, false, null));
    	console.dir(result.UserSolution.Hosts[0].Host[0].Name[0]);
    	console.dir(result.UserSolution.Hosts[0].Host[1].Name[0]);
    */
    checkUserSolution(req,res);

	//console.dir(req.body);
});

//load homePage
app.get("/NetSolver/web/homeNetSolver.html", function(req,res){
	res.sendFile(path.join(__dirname+"/NetSolver/web/homePageNetSolver.html"));
});

//server up
app.listen(3000, function(){
	  console.log('Server up: http://localhost:3000');
});

