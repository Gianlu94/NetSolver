/*
 *The MIT License (MIT)

 *Copyright (c) 2016 GianLuke

 *Permission is hereby granted, free of charge, to any person obtaining a copy of this software and 
 *associated documentation files (the "Software"), to deal in the Software without restriction, including 
 *without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies 
 *of the Software, and to permit persons to whom the Software is 
 *furnished to do so, subject to the following conditions:

 *The above copyright notice and this permission notice shall be included in all copies or substantial portions of
 *the Software.

 *THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 *WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 *COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
 *ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/*
	This files contains function that check userSolution
 */

var DOMParser = require('xmldom').DOMParser;
var path = require("path");
var fs = require("fs");
var xpath = require("xpath");


//My modules
var networkProblem = require("./problem.js");
var creationProblem = require("./create_problems.js");
var receivedSolution =  require("./received_solution.js");
var errorCostant = require("./error_constant.js");

module.exports = {

	checkUserSolution : function(req, res, difficultyP){
		var htmlResponse ="<h3>List of errors </h3>";
		var parser = new DOMParser();
		var userSFile = parser.parseFromString(req.body, "application/xml");
		switch (difficultyP) {
			case "/../Tracks/Track1/track1.xml":
				functionUse.checkProcedure(parser,userSFile,difficultyP,htmlResponse,res,true,false,false,false);
				break;
			case "/../Tracks/Track1/track2.xml":
				functionUse.checkProcedure(parser,userSFile,difficultyP,htmlResponse,res,false,true,false,false);
				break;
			case "/../Tracks/Track1/track3.xml":
				functionUse.checkProcedure(parser,userSFile,difficultyP,htmlResponse,res,false,false,false,true);
				break;
			case "/../Tracks/Track2/track1.xml":
				functionUse.checkProcedure(parser,userSFile,difficultyP,htmlResponse,res,false,true,true,false);
				break;
			default :
				break;
		}
	}
}

functionUse = {
	checkProcedure: function (parser, userSFile, difficultyProblemFile, htmlResponse, res, exitForced, executeSwitchCheck,
							  executeVlanCheck, executeHubCheck) {
		var passed = false;
		var htmlResponseSupport = "";
	
		fs.readFile(path.join(__dirname +difficultyProblemFile), function (err, file) {
			if (err) {
				res.writeHead(500, {'Content-Type': 'text/html'});
				res.end(errorCostant.internalServerError, "utf-8");
				// write an error response or nothing here
				return;
			} else {

				var fileString = file.toString();
				var doc = parser.parseFromString(fileString, "application/xml");

				var objectProblem = networkProblem.createObjectProblem(doc);

				var numberHost = networkProblem.getTotalNumberHost();


				var hostU = receivedSolution.getNumberHost(userSFile);


				if (numberHost != hostU) {

					htmlResponse = htmlResponse + "<ul><li>Number of host is not equal</li></ul>";
					res.send(htmlResponse);
				}
				else {

					var listHosts = receivedSolution.getListHost(userSFile);
					htmlResponseSupport = htmlResponseSupport + "<ul>";
					var hostArray = [];
					var hostArrayDuplicate = [];
					for (var i = 0; i < numberHost; i++) {
						
						var ipA = (xpath.select("//" + listHosts[i].localName + "/Ip", userSFile));
						var getW = (xpath.select("//" + listHosts[i].localName + "/Gateway", userSFile));
						var netM = (xpath.select("//" + listHosts[i].localName + "/Netmask", userSFile));

						htmlResponseSupport = networkProblem.checkIfIsValidAddress(ipA[i], htmlResponseSupport, true, i);
						htmlResponseSupport = networkProblem.checkIfIsValidAddress(getW[i], htmlResponseSupport, false, i);
						htmlResponseSupport = networkProblem.checkIfIsValidNetmask(netM[i], ipA[i], htmlResponseSupport, i);

						if (ipA[i].firstChild != null) {
							networkProblem.checkDuplicateAddress(ipA[i].firstChild.data, hostArray, hostArrayDuplicate);
						}

					}

					if (hostArrayDuplicate.length != 0) {
						for (var i = 0; i < hostArrayDuplicate.length; i++) {
							htmlResponseSupport = htmlResponseSupport + "<li> The following ip address " + hostArrayDuplicate[i] +
								" appears more than one time</li>";
							htmlResponse = htmlResponse + htmlResponseSupport+ "</ul>";
							res.send(htmlResponse);
						}
					}
					else if (htmlResponseSupport.indexOf("ERROR") != -1) {
						htmlResponse = htmlResponse + htmlResponseSupport+ "</ul>";
						res.send(htmlResponse);
					}
					else if (exitForced) {
						htmlResponse = htmlResponse + "<h3>No errors occured</h3>";
						res.send(htmlResponse);
					}
					else if (executeSwitchCheck) {
						functionUse.checkSwitches(doc, userSFile, htmlResponse, res, executeVlanCheck, executeHubCheck);
					}
					else if (executeHubCheck) {
						functionUse.checkHub(doc, userSFile, htmlResponse, res);
					}


				}

			}
		});

	},

	/*This is the function (2nd check) called afer checkProcedure.
	 It perfoms switch's checks
	 */
	checkSwitches : function(doc,userSFile,htmlResponse,res,checkVlan, executeCheckHub){
		
		var switchP = networkProblem.getNumberCommonSwitches(doc);
		var switchU = receivedSolution.getNumberSwitch(userSFile);
		var devicesConnected=[];
		var arrayVlanConnected=[];
	
		var portsL = 0;
		var portC = 0;
	
		var htmlResponseSupport="";
		
		if (switchP != switchU) {
	
			htmlResponse = htmlResponse + "<ul><li>Number of switches is not equal</li></ul>";
			res.send(htmlResponse);
		}
		else{
			htmlResponseSupport = htmlResponseSupport + "<ul>";
			var errorFound = false;
			
			//extract switch data from xml
			var listSwitch = receivedSolution.getListSwitch(userSFile);
		
			for (var i=0; i<switchP && !errorFound; i++){
	
				
				var name = receivedSolution.getSwitchNames(userSFile);
	
				if (name[i].firstChild==null){
					htmlResponseSupport = htmlResponseSupport+"<li>Error Switch name line "+i+": Null field found </li>";
	
				}
				else{
					var nameS= name[i].firstChild.data;
				
					htmlResponseSupport = htmlResponseSupport+"<h4>    "+nameS+"</h4><ul>";
					
					//getting the ports of switch i
					var tempL = receivedSolution.getSwitchPortsLengths(userSFile);
					portsL = portsL +parseInt(tempL[i].firstChild.data);
					
					for (var j = portC; j < portsL; j++){
						
						var portsN = receivedSolution.getSwitchPortsNumber(userSFile);
						var portType = receivedSolution.getSwitchPortsType(userSFile);
						var portConnectTo = receivedSolution.getSwitchPortsConnectTo(userSFile);
						var vlanConnected = receivedSolution.getSwitchVlanConnected(userSFile);
						
						devicesConnected.push(portConnectTo[j].firstChild.data);
						arrayVlanConnected.push(vlanConnected[j].firstChild.data);
						htmlResponseSupport=networkProblem.checkIfDeviceIsSetted(portsN[j].firstChild.data,portType[j].firstChild.data,portConnectTo[j].firstChild.data,htmlResponseSupport);
					}
					if (htmlResponseSupport.indexOf("ERROR")>-1){
						errorFound = true;
					}
	
					portC = portsL;
					htmlResponseSupport = htmlResponseSupport+"</ul>";
	
				}
	
	
	
			}
			if (errorFound){
				htmlResponse = htmlResponse+htmlResponseSupport+"</ul>";
				res.send(htmlResponse);
			}
			else {
				var TypeLink = networkProblem.typeLink(doc);
				
				htmlResponseSupport = networkProblem.checkLogicConnection(htmlResponseSupport, devicesConnected, TypeLink);
				if (htmlResponseSupport.indexOf("ERROR") > -1) {
	
					htmlResponse = htmlResponse + htmlResponseSupport + "</ul>";
					res.send(htmlResponse);
	
				}
				else if (checkVlan){
					//Insert check on hub
					functionUse.checkVlans(doc, userSFile, htmlResponse, res, devicesConnected, arrayVlanConnected);
				}
				else if (executeCheckHub){
					functionUse.checkHub(doc,userSFile,htmlResponse,res);
				}
				else {
					htmlResponse = htmlResponse + "<h3>No errors occured</h3>";
					res.send(htmlResponse);
				}
			}
	
	
		}
	
	},

	/*
	 From this function, vlan's checks start
	 */

	checkVlans : function (doc, userSFile, htmlResponse, res, devicesConnected, arrayVlanConnected){
		
		var htmlResponseSupport = "";
	
		var vlanP = networkProblem.getNumberVlan();
		var vlanU = receivedSolution.getNumberVlan(userSFile);
	
		if (vlanP != vlanU){
			htmlResponse = htmlResponse + "<ul><li>Number of vlans is not equal</li></ul>";
			res.send(htmlResponse);
		}
		else{
			for (var i = 0; i < vlanP; i++) {
	
				var id = receivedSolution.getVlanId(userSFile);
				var name = receivedSolution.getVlanName(userSFile);
				htmlResponseSupport = htmlResponseSupport+networkProblem.checkNullFieldsVlan(id[i], name[i], i);
			}
			
			if (htmlResponseSupport.indexOf("ERROR") > -1){
				htmlResponse = htmlResponse + htmlResponseSupport;
				res.send(htmlResponse);
			}
			else{
				var objectTypeLink = networkProblem.typeLink(doc);
	
				htmlResponseSupport = htmlResponseSupport+networkProblem.checkLogicConnectionVlan(objectTypeLink,devicesConnected, arrayVlanConnected,
					res,doc);
				if (htmlResponseSupport.indexOf("ERROR") > -1) {

					//no ul
					htmlResponse = htmlResponse + htmlResponseSupport + "</ul>";
					res.send(htmlResponse);

				}
				else {
					htmlResponse = htmlResponse + "<h3>No errors occured</h3>";
					res.send(htmlResponse);

				}

			}
	
		}

	},

	/*
	 This function contains checks on hub
	 */

	checkHub : function(doc, userSFile, htmlResponse, res){
		var htmlResponseSupport = "";
	
		var hubP = networkProblem.getNumberHub();
		var hubU = receivedSolution.getHubNumber(userSFile);
	
		var portsL = 0;
		var portC = 0;
	
		var devicesConnected=[];
	
		if (hubP != hubU){
			htmlResponse = htmlResponse + "<ul><li>Number of hub is not equal</li></ul>";
			res.send(htmlResponse);
		}else{
			htmlResponseSupport = htmlResponseSupport + "<ul>";
			var errorFound = false;
			
			//extract hub data from xml
			var listHub = receivedSolution.getListHub(userSFile);

			for (var i=0; i<hubP && !errorFound; i++){
	
				var name = receivedSolution.getHubNames(userSFile);
	
				if (name[i].firstChild==null){
					htmlResponseSupport = htmlResponseSupport+"<li>ERROR Hub name line "+i+": Null field found </li>";
	
				}
				else{
					var nameS= name[i].firstChild.data;
					htmlResponseSupport = htmlResponseSupport+"<h4>    "+nameS+"</h4><ul>";
					
					//getting the ports of switch i
					var tempL = receivedSolution.getHubInterfaceLengths(userSFile);
					portsL = portsL +parseInt(tempL[i].firstChild.data);
					
					for (var j = portC; j < portsL; j++){
						
						var portsN = receivedSolution.getHubPortsNumber(userSFile);
						var portType = receivedSolution.getHubPortsType(userSFile);
						var portConnectTo = receivedSolution.getHubPortsConnectTo(userSFile);
						
						devicesConnected.push(portConnectTo[j].firstChild.data);
						htmlResponseSupport=networkProblem.checkIfDeviceIsSetted(portsN[j].firstChild.data,portType[j].firstChild.data,portConnectTo[j].firstChild.data,htmlResponseSupport);
					}
					if (htmlResponseSupport.indexOf("ERROR")>-1){
						errorFound = true;
					}
					htmlResponseSupport = htmlResponseSupport+"</ul>";
	
				}
	
	
	
			}
			if (errorFound){
				htmlResponse = htmlResponse+htmlResponseSupport+"</ul>";
				res.send(htmlResponse);
			}
			else {
				var TypeLink = networkProblem.typeLink(doc);
				htmlResponseSupport = networkProblem.checkLogicConnection(htmlResponseSupport, devicesConnected, TypeLink);
				if (htmlResponseSupport.indexOf("ERROR") > -1) {
	
					htmlResponse = htmlResponse + htmlResponseSupport + "</ul>";
					res.send(htmlResponse);
	
				}
				else {
					htmlResponse = htmlResponse + "<h3>No errors occured</h3>";
					res.send(htmlResponse);
					
				}
			}

		}

	}
	
}
