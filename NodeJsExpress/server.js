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



function createXmlProblem(arrayXml,difficultyP){
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
			case "-switch" :
				xw.startElement('Switch');
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
	fs.writeFile(__dirname+difficultyP, xw.toString(), function (err) {
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
			var randomFileToSend = parseInt(((Math.random() * 2) + 1));
			console.log("RandomFileTo send" + randomFileToSend);
			fs.readFile(path.join(__dirname+"/Traces/Trace1/trac"+randomFileToSend+".txt"), function(err, file) {
			difficultyP="/Traces/Trace1/trac"+randomFileToSend+".xml";
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
   		    			var numberHosts = Math.floor((Math.random() * 1) + 2);
   		    			array[i]= numberHosts+" hosts";
   		    			arrayXml = arrayXml +" -hosts "+array[i];
   		    			break;
					case "-switch-" :
						var numberSwitch = Math.floor((Math.random() * 3) + 1);
						array[i]= numberSwitch+" switches";
						arrayXml = arrayXml +" -switch "+array[i];
						break;
   		    		default : 
   		    			break;
   		    	}
   		    	arrayClient = arrayClient +" "+array[i];
    		}
    		//console.log(arrayXml);
    		createXmlProblem(arrayXml.split(" "),difficultyP);
            res.writeHead(200, { 'Content-Type': 'text/html' });  
            res.end(arrayClient.toString(), "utf-8");  
        });
		break;
		default : break;
	}
}

//check on a ip address
function checkIfIsValidAddress (ipA, htmlResponse,network){
	
	console.log("Network : ", network);
	var block = new Netmask(network);
	
	if(ipA.firstChild == null) {
		htmlResponse = htmlResponse + "<li> Error : null field found</li>";
	}
	else {
		ipV = ipA.firstChild.data;
		if (!(ipM.isV4Format(ipV))){
			htmlResponse = htmlResponse + "<li> Error : "+ipV + " is not a valid IPV4 Address</li>";
		}
		else if(ipV == block.base){
			htmlResponse = htmlResponse + "<li> Error : "+ipV + " is the Network Address</li>";
		}
		else if(ipV == block.mask){
			htmlResponse = htmlResponse + "<li> Error : "+ipV + " is the Netmask</li>";
		}
		else if(ipV == block.broadcast){
			htmlResponse = htmlResponse + "<li> Error : "+ipV + " is the BroadCast Address</li>";
		}
		else if(!block.contains(ipV)){
			htmlResponse = htmlResponse + "<li> Error : "+ipV + " doesn't belong to the network : " + network +"</li>";
		}
	}
	//console.log("Ipa : "+ ipV);
	console.log("Base : "+ block.base);
	console.log("Last : "+ block.last);  
	console.log("Netmask : "+ block.mask);
	console.log("Broadcast : "+ block.broadcast);      
	console.log("Gateway : "+ block.last);   
	
	return htmlResponse;
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
	if (netmask.firstChild == null){
		htmlResponse = htmlResponse + "<li> Error : null field</li>";
	}
	else if(netmask.firstChild.data != block.mask){
		htmlResponse = htmlResponse + "<li> Error : "+netmask + " is not the Netmask</li>";		
	}
	return htmlResponse;
}

/*function checkProcedure(parser,userSFile,difficultyProblemFile,htmlResponse,res,exitForced,executeSwitchCheck){
	var passed = false;
	console.log("Problem oks");
	fs.readFile(path.join(__dirname+difficultyProblemFile), function(err, file) {
		if (err) {
			// write an error response or nothing here
			return;
		} else {
			var fileString = file.toString();
			var doc = parser.parseFromString(fileString, "application/xml");
			var network = (xpath.select("//Network/text()", doc)).toString();
			var hostP = (xpath.select("//Hosts/text()", doc)).toString();
			var hostU = (xpath.select("//Hosts/Number/text()", userSFile)).toString();

			if (hostP != hostU) {
				console.log("HOSTP "+hostP+" hoSTU"+hostU);
				htmlResponse = htmlResponse + "<ul><li>Number of host is not equal</li></ul>";
				res.send(htmlResponse);
			}
			else {

				var listHosts = (xpath.select("//Host", userSFile));
				htmlResponse = htmlResponse+"<ul>";
				var hostArray = [];
				var hostArrayDuplicate = [];
				//console.log("List hosts" + listHosts);
				for (var i = 0; i < hostP; i++) {
					//console.log(listHosts[i].localName);
					var ipA = (xpath.select("//" + listHosts[i].localName + "/Ip", userSFile));
					var getW = (xpath.select("//" + listHosts[i].localName + "/Gateway", userSFile));
					var netM = (xpath.select("//" + listHosts[i].localName + "/Netmask", userSFile));



					//console.log("ip : "+ipA[i].firstChild.data);
					//console.log("ip : "+ipA[i].firstChild.data);
					//console.log("ip : "+ipA[i].firstChild.data);

					htmlResponse = checkIfIsValidAddress(ipA[i], htmlResponse, network);
					htmlResponse = checkIfIsValidAddress(getW[i], htmlResponse, network);
					htmlResponse = checkIfIsValidNetmask(netM[i], htmlResponse, network)
					if (ipA[i].firstChild != null) {
						checkDuplicateAddress(ipA[i].firstChild.data, hostArray, hostArrayDuplicate);
						hostArray.push(ipA[i].firstChild.data);
					}
					//var ip = (xpath.select("/"+listHosts[i].localName+"/Ip/text()",userSFile)).toString();
					//console.log("Host ip "+ i +"Ip address" + ipA[i].firstChild.data);
					//hostArray
				}
				//htmlResponse = htmlResponse + "</ul>";
				if (hostArrayDuplicate.length != 0) {
					for (var i = 0; i < hostArrayDuplicate.length; i++) {
						htmlResponse = htmlResponse + "<li> The following ip address " + hostArrayDuplicate[i] + " appears more than one time</li>";
					}
				}
				else if (htmlResponse.indexOf("Error") != -1) {
					htmlResponse = htmlResponse + "</ul>";
					res.send(htmlResponse);
					//htmlResponse = htmlResponse + "<h5>No errors occured</h5>";
				}
				else if (exitForced) {
					htmlResponse = htmlResponse + "<h5>No errors occured</h5>";
					res.send(htmlResponse);
				}
				else if (executeSwitchCheck) {
					checkSwitches(parser,doc,userSFile,htmlResponse,res,false);
				}


			}
			//console.log("PRIMA "+htmlResponse);
			//return htmlResponse;
		}
	});

}
*/

function checkProcedure(parser,userSFile,difficultyProblemFile,htmlResponse,res,exitForced,executeSwitchCheck){

	fs.readFile(path.join(__dirname+difficultyProblemFile), function(err, file) {
		if (err) {
			// write an error response or nothing here
			return;
		} else {
			var fileString = file.toString();
			var doc = parser.parseFromString(fileString, "application/xml");
			checkSwitches(parser,doc,userSFile,htmlResponse,res,false);
		}

	});

}

function checkExist(htmlRespone){
	if (htmlResponse.indexOf("Error") == -1) {
		return true;
		//htmlResponse = htmlResponse + "<h5>No errors occured</h5>";
	}
	else{
		return false;
	}
}
function typeLink(doc){
	/*var nHost = (xpath.select("//Hosts/Number/text()", userSFile)).toString();
	var nSwitch = (xpath.select("//Switches/Number/text()", userSFile)).toString();
	*/
	var nSwitch = (xpath.select("//Switch/text()", doc)).toString();
	var nHosts = (xpath.select("//Hosts/text()", doc)).toString();
	var Hlink = nHosts;
	var Slink;
	var Nlink = 0;

	if (nSwitch ==1){
		Slink = 0;
	}
	else if (nSwitch == 2){
		Slink = 1;
		Nlink = 1;
	}
	else if (nSwitch == 3){
		Slink = 2;
		Nlink = 1;
	}

	var Tlink = {Hl: Hlink, Sl : Slink, Nl : Nlink};

	return Tlink;
}

function CheckIfSwitchIsSetted (port,typeConnection,connectTo,htmlResponse){
	connectTo = connectTo.trim();
	typeConnection = typeConnection.trim();
	port = port.trim();
	if (isNaN(port)){
		htmlResponse = htmlResponse + "<li>- ERROR : A not defined Port was found</li>";
	}
	if ((typeConnection != "straight")&&(typeConnection != "cross")){
		htmlResponse = htmlResponse + "<li>- ERROR : Type Connnection not defined</li>";
	}
	if ((connectTo=="Hosts/Devices")||(connectTo=="Hosts")||(connectTo=="Switches")){
		htmlResponse = htmlResponse + "<li>- ERROR : Not connect to defined</li>";
	}
	else {
		if(connectTo.indexOf("Port")>-1){
			if ((typeConnection != "Type")&&(typeConnection != "cross")){
				htmlResponse = htmlResponse + "<li>- ERROR : defined connect to (type) not correct</li>";
			}
		}
		else{
			if  ((typeConnection != "Type")&&(typeConnection != "straight")){
					//console.log("TTTTTTTTTTTTTTT "+connectTo+""+typeConnection);
					htmlResponse = htmlResponse + "<li>- ERROR : defined connect to (type) not correct</li>";
			}
		}
	}




	return htmlResponse;
}

function checkLogicConnection (htmlResposeSupport,devicesConnected,TypeLink){
	for (var i = 0; i < devicesConnected.length;i++){
		console.log("DevicesConnetecd "+i+ " : " +devicesConnected[i] );
		if(devicesConnected[i].indexOf("Port")>-1){
			if (TypeLink.Sl == 0){
				htmlResposeSupport = htmlResposeSupport + "<li>WARNING : Redudant or uneccesary connection found</li>"
			}
			else {
				TypeLink.Sl--;
				console.log("Typelink "+TypeLink.Sl);
			}
		}
		else{
			TypeLink.Hl--;
			console.log("Typelink "+TypeLink.Hl);
		}
	}
	if(TypeLink.Hl > 0){
		htmlResposeSupport = htmlResposeSupport + "<li>ERROR : Host/s not connected yet</li>";
	}
	if(TypeLink.Sl > 0){
		htmlResposeSupport = htmlResposeSupport + "<li>ERROR : Switch/es not connected yet</li>";
	}
	console.log("-----2   HLink "+TypeLink.Hl+" SLink "+TypeLink.Sl+" Nlink "+TypeLink.Nl);

	return htmlResposeSupport;
}

function checkSwitches(parser,doc,userSFile,htmlResponse,res,exitForced){


			var switchP = (xpath.select("//Switch/text()", doc)).toString();
			var switchU = (xpath.select("//Switches/Number/text()", userSFile)).toString();
			var devicesConnected=[];

			var portsL = 0;
			var portC = 0;

			var htmlResponseSupport="";
			//console.log("HOSTP "+switchP+" hoSTU"+switchU);
			if (switchP != switchU) {

				htmlResponse = htmlResponse + "<ul><li>Number of switches is not equal</li></ul>";
				res.send(htmlResponse);
			}
			else{
				htmlResponseSupport = htmlResponseSupport + "<ul>";
				var errorFound = false;
				//extract switch data from xml
				var listSwitch = (xpath.select("/UserSolution/Switches/Switch", userSFile));
				//console.log("HOST L " + TypeLink.Hl +"Switch L " +TypeLink.Sl + "NNL"+TypeLink.Nl);
				for (var i=0; i<switchP && !errorFound; i++){

					var name = (xpath.select("/UserSolution/Switches/Switch/Name", userSFile));

					if (name[i].firstChild==null){
						htmlResponseSupport = htmlResponseSupport+"<li>Error Switch name line "+i+": Null field found </li>";

					}
					else{
						console.log("*****NAME SWITCH "+name[i].firstChild.data);
						var nameS= name[i].firstChild.data;
						console.log("NAME "+nameS);
						htmlResponseSupport = htmlResponseSupport+"<h4>    "+nameS+"</h4><ul>";
						//getting the ports of switch i
						var tempL = (xpath.select("/UserSolution/Switches/Switch/Ports/PortsLength", userSFile));
						portsL = portsL +parseInt(tempL[i].firstChild.data);
						console.log("PORT L BEFORE "+portsL);
						for (var j = portC; j < portsL; j++){
							console.log("STEP "+j);
							var portsN =(xpath.select("/UserSolution/Switches/Switch/Ports/Port/Number", userSFile));
							var portType = (xpath.select("/UserSolution/Switches/Switch/Ports/Port/TypeConnection", userSFile));
							var portConnectTo = (xpath.select("/UserSolution/Switches/Switch/Ports/Port/ConnectTo", userSFile));
							devicesConnected.push(portConnectTo[j].firstChild.data);
							htmlResponseSupport=CheckIfSwitchIsSetted(portsN[j].firstChild.data,portType[j].firstChild.data,portConnectTo[j].firstChild.data,htmlResponseSupport);
						}
						if (htmlResponseSupport.indexOf("ERROR")>-1){
							errorFound = true;
						}

						portC = portsL;
						console.log("PORT L AFTER "+portsL);
						htmlResponseSupport = htmlResponseSupport+"</ul>";

					}



				}
				if (!errorFound){
					console.log("NO errors");
					/*htmlResponse = htmlResponse+htmlResponseSupport+"</ul>";
					res.send(htmlResponse);*/
					//check logic
					var TypeLink = typeLink(doc);
					console.log("-----1   HLink "+TypeLink.Hl+" SLink "+TypeLink.Sl+" Nlink "+TypeLink.Nl);
					htmlResponseSupport = checkLogicConnection(htmlResponseSupport,devicesConnected,TypeLink);
					htmlResponse = htmlResponse+htmlResponseSupport+"</ul>";
					res.send(htmlResponse);
					console.log(htmlResponse);
				}
				else{
					htmlResponse = htmlResponse+htmlResponseSupport+"</ul>";
					res.send(htmlResponse);
				}
				//check logic
				/*var TypeLink = typeLink(userSFile);
				console.log("HLink "+TypeLink.Hl+" SLink "+TypeLink.Sl+" Nlink "+TypeLink.Nl);
				htmlResponse = htmlResponse+htmlResponseSupport+"</ul>";
				res.send(htmlResponse);
				*/

			}
			/*else if{
				htmlResponse = htmlResponse + "<h5>No errors occured</h5>";
				res.send(htmlResponse);
			}*/


}

function checkUserSolution (req,res){
	var htmlResponse ="<h3>List of errors </h3>";
	var parser = new DOMParser();
	var userSFile = parser.parseFromString(req.body, "application/xml");
	var exitForced = true;
	console.log("DifficultyP " + difficultyP);
	switch (difficultyP) {
		case "/Traces/Trace1/trac1.xml":
			checkProcedure(parser,userSFile,difficultyP,htmlResponse,res,exitForced);
			//res.send(htmlResponse);
			break;
		case "/Traces/Trace1/trac2.xml":
			checkProcedure(parser,userSFile,difficultyP,htmlResponse,res,false,true);
			/*console.log("FINITO CONTROLLO");
			checkSwitches(parser,userSFile,difficultyP,htmlResponse,res,false);
			console.log("FINITO CONTROLLO2");
			*/
			//res.send(htmlResponse);
			break;
		default : 
			break;
	}
//console.log("*DDDD ",difficultyP);
}

//manage  the request of a network problem
app.get("/Tracer", function(req,res){
	var url2 = url.parse(req.url);
	var queryObj = querystring.parse(url2.query);
	var obj = JSON.parse(queryObj.data);
	var difficulty = obj.difficulty;
	//console.log("REQUEST RECEIVED difficulty "+difficulty);
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

