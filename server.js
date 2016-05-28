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

//My modules
var networkProblem = require("./problem.js");

var parser = new xml2js.Parser();
var difficultyP="";

//var arrayObjectProblem = [];

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
    var xw = new XmlWriter(true);
	xw.startDocument();
	xw.startElement('Problem');
	for(var i = 0; i < arrayXml.length;i++) {
		//console.log(arrayXml[i]+"\n");
   		switch (arrayXml[i]){
			case "-networkProblems" :
				xw.startElement('NetworkProblem');
				arrayXml[i]=" ";
				break;
			case "-number" :
				xw.startElement('Number');
				xw.text(arrayXml[i+1]);
				xw.endElement();
				break;
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
			case "-networkProbleme" :
				xw.endElement();
				arrayXml[i]=" ";
				break;
			case "-switch" :
				xw.startElement('Switch');
				//var numberHosts = Math.floor((Math.random() * 3) + 1);
				xw.text(arrayXml[i+1]);
				//console.log("***NNNNNH ",numberHosts);
				//xw.text(numberHosts);
				xw.endElement();
				break;
			case "-vlans" :
				xw.startElement('Vlan');
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

//get network address from NetworkAddress.txt
function setNetworkAddress (arrayN){
		 var randomNetworkToSend = parseInt(Math.random()*3);
		console.log("*RANDOMNETWORKTOSEND "+randomNetworkToSend);
		 return arrayN[randomNetworkToSend];
}

function DifficultyFile (difficulty,req,res) {
	console.log("PARAM "+ difficulty);
	var randomFileToSend;
	switch (difficulty){
		case '1' :
			randomFileToSend = parseInt(((Math.random() * 2) + 1));
			console.log("RandomFileTo send" + randomFileToSend);
			break;
		case '2' :
			randomFileToSend = parseInt(((Math.random() * 1) + 1));
			console.log("RandomFileTo send" + randomFileToSend);
			break;
		default : break;
	}
	fs.readFile(path.join(__dirname+"/Traces/Trace"+difficulty+"/trac"+randomFileToSend+".txt"), function(err1, file1) {
		difficultyP="/Traces/Trace"+difficulty+"/trac"+randomFileToSend+".xml";
		if(err1) {
			// write an error response or nothing here
			return;
		}
		else {
			fs.readFile(path.join(__dirname+"/ServerRes/NetworkAddress.txt"), function(err2, file2) {
				if (err2){
					// write an error response or nothing here
					return;
				}
				else {
					var array = file1.toString().split(" ");
					var arrayClient = "";
					var arrayXml = "";
					var array2 = file2.toString().split('\n');
					for (var i = 0; i < array.length; i++) {
						array[i] = array[i].trim();
						switch (array[i]) {
							case "-network-" :
								array[i] = setNetworkAddress(array2);
								arrayXml = arrayXml + "-network " + array[i];
								break;
							case "-number-" :
								array[i] = "";
								arrayXml = arrayXml + " -number " + array[i + 1];
								array[i + 1] = "";
								break;
							case "-hosts-" :
								var numberHosts = Math.floor((Math.random() * 1) + 2);
								array[i] = numberHosts + " hosts";
								arrayXml = arrayXml + " -hosts " + array[i];
								break;
							case "-switch-" :
								var numberSwitch = Math.floor((Math.random() * 3) + 1);
								array[i] = numberSwitch + " switches";
								arrayXml = arrayXml + " -switch " + array[i];
								break;
							case "-vlans-" :
								var numberVlan = Math.floor((Math.random() * 3) + 1);
								array[i] = numberVlan + " vlan";
								arrayXml = arrayXml + " -vlans " + array[i];
								break;
							case "-networkProblems-" :
								array[i] = "";
								arrayXml = arrayXml + " -networkProblems ";
								break;
							case "-networkProbleme-" :
								array[i] = "";
								arrayXml = arrayXml + " -networkProbleme ";
								break;
							case "-wrap-" :
								array[i] = "\n";
								break;
							default :
								break;
						}
						arrayClient = arrayClient + " " + array[i];
					}
					console.log("*** 2 " + arrayClient);
					console.log("*** 1 " + arrayXml);
					createXmlProblem(arrayXml.split(" "), difficultyP);
					res.writeHead(200, {'Content-Type': 'text/html'});
					res.end(arrayClient.toString(), "utf-8");
				}
			});
		}
	});
}

//check on a ip address
function checkIfIsValidAddress (ipA, htmlResponse, checkLimitExceed){
	
	//console.log("Network : ", network);
	//var block = new Netmask(network);
	
	if(ipA.firstChild == null) {
		htmlResponse = htmlResponse + "<li> Error : null field found</li>";
	}
	else {
		ipV = ipA.firstChild.data;
		console.log("IPV "+ipV);
		if (!(ipM.isV4Format(ipV))){
			htmlResponse = htmlResponse + "<li> Error : "+ipV + " is not a valid IPV4 Address</li>";
		}
		else {
			var ipV2 = networkProblem.normalizeIpAddress(ipV);
			if (networkProblem.isNetworkAddress(ipV2)) {
				htmlResponse = htmlResponse + "<li> Error : " + ipV + " is the Network Address</li>";
			}
			else if (networkProblem.isNetmaskAddress(ipV2)) {
				htmlResponse = htmlResponse + "<li> Error : " + ipV + " is the Netmask</li>";
			}
			
			else if (networkProblem.isBroadcastAddress(ipV2)) {
					htmlResponse = htmlResponse + "<li> Error : " + ipV + " is the BroadCast Address</li>";
			}
			else if(!(networkProblem.belongNetwork(ipV))){
				htmlResponse = htmlResponse + "<li> Error : "+ipV + " ip doesn't belong to any network</li>";
			}
			else if (checkLimitExceed) {
				if (networkProblem.LimitExceed(ipV)) {
					htmlResponse = htmlResponse + "<li> Error : " + ipV + " exceeds limit of host defined for its network</li>";
				}
			}
		}
	}

		//else if(!block.contains(ipV)){
		//	htmlResponse = htmlResponse + "<li> Error : "+ipV + " doesn't belong to the network : " + network +"</li>";
		//}
	//console.log("Ipa : "+ ipV);
	/*console.log("Base : "+ block.base);
	console.log("Last : "+ block.last);  
	console.log("Netmask : "+ block.mask);
	console.log("Broadcast : "+ block.broadcast);      
	console.log("Gateway : "+ block.last);
	*/
	
	return htmlResponse;
	//console.log("Block Base : ", block.base);
}


//This is the function that gradually creates an array with the duplicate ip
function checkDuplicateAddress (ipA, hostArray, hostArrayDuplicate){


	ipA = networkProblem.normalizeIpAddress(ipA);
	/*console.log("IPA "+ipA);
	console.log("III1"+hostArray.indexOf(ipA));
	console.log("DDDDD1"+)
	*/
	if (hostArray.indexOf(ipA) != -1){
		if (hostArrayDuplicate.indexOf(ipA) == -1){
			hostArrayDuplicate.push(ipA);
		}
	}
	else{
		hostArray.push(ipA);
	}

}

//This is the function that check if the given ip is valid or not
function checkIfIsValidNetmask (netmask, ipA, htmlResponse){
	if (netmask.firstChild == null){
		htmlResponse = htmlResponse + "<li> Error : null field</li>";
	}
	//else if(!networkProblem.isNetmaskAddressIndex(netmask.firstChild.data, index)){
	else {
		if (ipA.firstChild != null){
			var ipV = ipA.firstChild.data;
			if (ipM.isV4Format(ipV)){
				var ipV2 = networkProblem.normalizeIpAddress(ipV);
				if ((!networkProblem.isNetworkAddress(ipV2)) && (!networkProblem.isBroadcastAddress(ipV2)) &&
					networkProblem.belongNetwork(ipV)) {
					if(!networkProblem.isNetmaskAddressIp(netmask.firstChild.data, ipV2)){
						htmlResponse = htmlResponse + "<li> Error : " + netmask + " is not the Netmask</li>";
					}

				}
			}
		}
	}
	return htmlResponse;
}

/*
//This function extarc data from problem's xml and create an object Problem
function createObjectProblem (doc){


	var numberNetworkProblem = (xpath.select("/Problem/Number/text()", doc)).toString();
	//console.log("Network problem number "+numberNetworkProblem);
	for (var i = 0; i < numberNetworkProblem; i++){
		var networkProblems = (xpath.select("//NetworkProblem", doc));
		var networkV = (xpath.select("//" + networkProblems[i].localName + "/Network/text()", doc)).toString();
		var hostV = (xpath.select("//" + networkProblems[i].localName + "/Hosts/text()", doc)).toString();
		//var objectProblem = {network : networkV, host : hostV }
		//arrayObjectProblem.push(objectProblem)
		//console.log("**NETOWRK    "+network);
		//console.log("**HOST    "+host);
		console.log("Number network problem "+networkProblem.createAndInsertObjectProblem(networkV, hostV,doc));
	}
}
*/

//This is the function from which the check starts
function checkProcedure(parser,userSFile,difficultyProblemFile,htmlResponse,res,exitForced,executeSwitchCheck,
						executeVlanCheck){
	var passed = false;
	console.log("Problem oks");
	fs.readFile(path.join(__dirname+difficultyProblemFile), function(err, file) {
		if (err) {
			// write an error response or nothing here
			return;
		} else {

			var fileString = file.toString();
			var doc = parser.parseFromString(fileString, "application/xml");
			//var network = (xpath.select("//Network/text()", doc)).toString();
			//var hostP = (xpath.select("//Hosts/text()", doc)).toString();
			var objectProblem = networkProblem.createObjectProblem(doc);

			var numberHost = networkProblem. getTotalNumberHost();


			var hostU = (xpath.select("//Hosts/Number/text()", userSFile)).toString();
			

			if (numberHost != hostU) {
				//console.log("HOSTP "+hostP+" hoSTU "+hostU);
				htmlResponse = htmlResponse + "<ul><li>Number of host is not equal</li></ul>";
				res.send(htmlResponse);
			}
			else {

				var listHosts = (xpath.select("//Host", userSFile));
				htmlResponse = htmlResponse+"<ul>";
				var hostArray = [];
				var hostArrayDuplicate = [];
				//console.log("List hosts" + listHosts);
				for (var i = 0; i < numberHost; i++) {
					//console.log(listHosts[i].localName);
					var ipA = (xpath.select("//" + listHosts[i].localName + "/Ip", userSFile));
					var getW = (xpath.select("//" + listHosts[i].localName + "/Gateway", userSFile));
					var netM = (xpath.select("//" + listHosts[i].localName + "/Netmask", userSFile));



					//console.log("ip : "+ipA[i].firstChild.data);
					//console.log("ip : "+ipA[i].firstChild.data);
					//console.log("ip : "+ipA[i].firstChild.data);

					htmlResponse = checkIfIsValidAddress(ipA[i], htmlResponse, true);
					htmlResponse = checkIfIsValidAddress(getW[i], htmlResponse, false);
					htmlResponse = checkIfIsValidNetmask(netM[i], ipA[i], htmlResponse);
					if (ipA[i].firstChild != null) {
						checkDuplicateAddress(ipA[i].firstChild.data, hostArray, hostArrayDuplicate);
						//hostArray.push(ipA[i].firstChild.data);
					}
					//var ip = (xpath.select("/"+listHosts[i].localName+"/Ip/text()",userSFile)).toString();
					//console.log("Host ip "+ i +"Ip address" + ipA[i].firstChild.data);
					//hostArray
				}
				//htmlResponse = htmlResponse + "</ul>";
				if (hostArrayDuplicate.length != 0) {
					for (var i = 0; i < hostArrayDuplicate.length; i++) {
						htmlResponse = htmlResponse + "<li> The following ip address " + hostArrayDuplicate[i] + " appears more than one time</li>";
						res.send(htmlResponse);
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
					checkSwitches(doc,userSFile,htmlResponse,res,executeVlanCheck);
				}


			}
			//console.log("PRIMA "+htmlResponse);
			//return htmlResponse;
		}
	});

}


/*function checkProcedure(parser,userSFile,difficultyProblemFile,htmlResponse,res,exitForced,executeSwitchCheck){

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
*/

function checkExist(htmlRespone){
	if (htmlResponse.indexOf("Error") == -1) {
		return true;
		//htmlResponse = htmlResponse + "<h5>No errors occured</h5>";
	}
	else{
		return false;
	}
}

//This is the function that create the object links
function typeLink(doc){
	/*var nHost = (xpath.select("//Hosts/Number/text()", userSFile)).toString();
	var nSwitch = (xpath.select("//Switches/Number/text()", userSFile)).toString();
	*/
	var nSwitch = networkProblem.getNumberCommonSwitches(doc);
	var numberHost = networkProblem.getTotalNumberHost();
	console.log("TypeLink "+ nSwitch + " nHISTS "+numberHost);
	var Hlink = numberHost;
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

	var Tlink = {Hl: numberHost, Sl : Slink, Nl : Nlink};

	return Tlink;
}

//This is the function that check if the fields of a switch are configured correctly
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

//This is the function that check connection betweeen switch/host
function checkLogicConnection (htmlResposeSupport,devicesConnected,TypeLink){
	for (var i = 0; i < devicesConnected.length;i++){
		console.log("DevicesConnetecd "+i+ " : " +devicesConnected[i] );
		if(devicesConnected[i].indexOf("Port")>-1){
			if (TypeLink.Sl == 0){
				htmlResposeSupport = htmlResposeSupport + "<li>WARNING : Redudant or unneccesary connection found</li>"
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
	//console.log("-----2   HLink "+TypeLink.Hl+" SLink "+TypeLink.Sl+" Nlink "+TypeLink.Nl);

	return htmlResposeSupport;
}

/*This is the function (2nd check) called afer checkProcedure.
  It perfoms switch's checks
 */
function checkSwitches(doc,userSFile,htmlResponse,res,checkVlan){


			var switchP = networkProblem.getNumberCommonSwitches(doc);
			var switchU = (xpath.select("//Switches/Number/text()", userSFile)).toString();
			var devicesConnected=[];
			var arrayVlanConnected=[];

			var portsL = 0;
			var portC = 0;

			var htmlResponseSupport="";
			console.log("SWICHP "+switchP+" SWITCHU "+switchU);
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
							var vlanConnected = (xpath.select("/UserSolution/Switches/Switch/Ports/Port/Vlan", userSFile));
							devicesConnected.push(portConnectTo[j].firstChild.data);
							arrayVlanConnected.push(vlanConnected[j].firstChild.data);
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
				if (errorFound){
					htmlResponse = htmlResponse+htmlResponseSupport+"</ul>";
					res.send(htmlResponse);
				}
				else {
					var TypeLink = typeLink(doc);
					console.log("-----1   HLink "+TypeLink.Hl+" SLink "+TypeLink.Sl+" Nlink "+TypeLink.Nl);
					htmlResponseSupport = checkLogicConnection(htmlResponseSupport, devicesConnected, TypeLink);
					if (htmlResponseSupport.indexOf("ERROR") > -1) {

						htmlResponse = htmlResponse + htmlResponseSupport + "</ul>";
						res.send(htmlResponse);

					}
					else if (checkVlan){

						checkVlans(doc, userSFile, htmlResponse, res, devicesConnected, arrayVlanConnected);
					}
					else {
						htmlResponse = htmlResponse + htmlResponseSupport + "</ul>";
						res.send(htmlResponse);
					}
				}


			}
			/*else if{
				htmlResponse = htmlResponse + "<h5>No errors occured</h5>";
				res.send(htmlResponse);
			}*/


}

/*
	This function check if vlan' s fields are null or not
 */

function checkNullFieldsVlan (id, name, switchPort, i){
	var htmlResponseSupport = ""
	if ((id == undefined) || (name == undefined) || (switchPort == undefined)){
		htmlResponseSupport = htmlResponseSupport+"<li>ERROR row " + i + " : null field/s or duplicate vlans found</li>";
	}
	else if ((id.firstChild == null) || (name.firstChild == null) || (switchPort.firstChild == null)){
		htmlResponseSupport = htmlResponseSupport+"<li>ERROR row " + i + " : null field/s or duplicate vlans found</li>";
	}
	else if (switchPort.firstChild.data.indexOf("Type") > -1){
		htmlResponseSupport = htmlResponseSupport+ "<li>ERROR row " + i + " : a not defined SwitchPort found</li>";
	}

	return htmlResponseSupport;
}

/*
 This function check vlan's logic
 */

function checkLogicConnectionVlan (objectTypeLink, devicesConnected, arrayVlanConnected, res){
	var htmlResponseSupport  = "";
	var numberVlans = networkProblem.getNumberVlan();
	var arrayVlanFound = [];
	for (var i = 0; i < devicesConnected.length;i++){

		var nameVlan = arrayVlanConnected[i];

		if (nameVlan.indexOf("Vlan") > -1){
			htmlResponseSupport = htmlResponseSupport + "<li>A not defined vlan found</li>";
			return htmlResponseSupport;
		}
		else if (devicesConnected[i].indexOf("Port") > -1){
			if (nameVlan.indexOf("mode") > -1) {
				if (objectTypeLink.Sl == 0) {
					htmlResponseSupport = htmlResponseSupport + "<li>WARNING : Redudant or unneccesary mode trunk found</li>";
				}
				else {
					objectTypeLink.Sl--;
					console.log("Typelink " + objectTypeLink.Sl);
				}
			}
			else{
				htmlResponseSupport = htmlResponseSupport + "<li>ERROR : Found vlan access instead of mode trunk</li>";
			}
		}
		else{
			if (nameVlan.indexOf("access") > -1) {
				if (objectTypeLink.Hl == 0) {
					htmlResponseSupport = htmlResponseSupport + "<li>WARNING : Redudant or unneccesary access mode defined</li>";
				}
				else {
					objectTypeLink.Hl--
					if (arrayVlanFound.indexOf(nameVlan) == -1) {
						numberVlans--;
						arrayVlanFound.push(nameVlan);
					}
				}
			}
			else{
				htmlResponseSupport = htmlResponseSupport + "<li>ERROR : Found mode trunk instead of \< vlan \> : access</li>";
			}

		}

	}

	if (objectTypeLink.Hl > 0){
		htmlResponseSupport = htmlResponseSupport + "<li>ERROR: SwitchPort/s access was/were not configured</li>";
	}
	if (objectTypeLink.Sl > 0){
		htmlResponseSupport = htmlResponseSupport + "<li>ERROR: SwitchPort/s mode trunk was/were not configured </li>";
	}
	if(numberVlans != 0){
		htmlResponseSupport = htmlResponseSupport + "<li>ERROR: One or more vlan(s) were not configured</li>";
	}
	
	return htmlResponseSupport;
}

/*
	From this function, vlan's checks start
 */

function checkVlans(doc, userSFile, htmlResponse, res, devicesConnected, arrayVlanConnected){


	var htmlResponseSupport = "";

	var vlanP = networkProblem.getNumberVlan();
	var vlanU = (xpath.select("//Vlans/Number/text()", userSFile)).toString();

	if (vlanP != vlanU){
		htmlResponse = htmlResponse + "<ul><li>Number of vlans is not equal</li></ul>";
		res.send(htmlResponse);
	}
	else{
		for (var i = 0; i < vlanP; i++) {

			var id = (xpath.select("/UserSolution/Vlans/Vlan/Id", userSFile));
			var name = (xpath.select("/UserSolution/Vlans/Vlan/Name", userSFile));
			var switchPort = (xpath.select("/UserSolution/Vlans/Vlan/SwitchPort", userSFile));
			console.log("i ID "+id[i] + " name "+name[i]+" switchPort "+switchPort[i]);
			htmlResponseSupport = htmlResponseSupport+checkNullFieldsVlan(id[i], name[i],
					switchPort[i], i);
		}
		if (htmlResponseSupport.indexOf("ERROR") > -1){
			console.log("QUI 11");
			htmlResponse = htmlResponse + htmlResponseSupport;
			res.send(htmlResponse);
		}
		else{
			var objectTypeLink = typeLink(doc);
			console.log("-----1   HLink "+objectTypeLink.Hl+" SLink "+objectTypeLink.Sl);

			htmlResponseSupport = checkLogicConnectionVlan(objectTypeLink,devicesConnected, arrayVlanConnected,
				res,doc);
			htmlResponse = htmlResponse +htmlResponseSupport;
			res.send(htmlResponse);
		}

	}

}

function checkUserSolution (req,res){
	var htmlResponse ="<h3>List of errors </h3>";
	var parser = new DOMParser();
	var userSFile = parser.parseFromString(req.body, "application/xml");
	console.log("DifficultyP " + difficultyP);
	switch (difficultyP) {
		case "/Traces/Trace1/trac1.xml":
			checkProcedure(parser,userSFile,difficultyP,htmlResponse,res,true,false,false);
			break;
		case "/Traces/Trace1/trac2.xml":
			checkProcedure(parser,userSFile,difficultyP,htmlResponse,res,false,true,false);
			break;
		case "/Traces/Trace2/trac1.xml":
			checkProcedure(parser,userSFile,difficultyP,htmlResponse,res,false,true,true);
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

