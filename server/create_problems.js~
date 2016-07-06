/*
 This file manages the creation of the network problems (XML and txt)
 */

var querystring = require("query-string");
var path = require("path");
var url = require("url");
var fs = require("fs");
var XmlWriter = require('xml-writer');

//My modules
var networkProblem = require("./problem.js");
var generateData = require("./generate_data.js");
var errorCostant = require("./error_constant.js");


var networkGiven = [];

module.exports = {

	problemPath : "",

	createXmlProblem : function(arrayXml, difficultyP, res){
		var xw = new XmlWriter(true);
		xw.startDocument();
		xw.startElement('Problem');
		for(var i = 0; i < arrayXml.length;i++) {
			
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
					xw.text(arrayXml[i+1]);
					xw.endElement();
					break;
				case "-networkProbleme" :
					xw.endElement();
					arrayXml[i]=" ";
					break;
				case "-switch" :
					xw.startElement('Switch');
					xw.text(arrayXml[i+1]);
					xw.endElement();
					break;
				case "-vlans" :
					xw.startElement('Vlan');
					xw.text(arrayXml[i+1]);
					xw.endElement();
					break;
				case "-hubs" :
					xw.startElement('Hub');
					xw.text(arrayXml[i+1]);
					xw.endElement();
					break;
				default : break;
			}
		}
		xw.endElement();
		xw.endDocument();
		fs.writeFile(__dirname+difficultyP, xw.toString(), function (err) {
			if (err) {
				res.writeHead(500, {'Content-Type': 'text/html'});
				res.end(errorCostant.internalServerError, "utf-8");
			}
		});
		
	},

	//support function used to give different networks
	networkAlreadyGiven : function(network){
		var trovato = false;
	
		for (var i = 0; i < networkGiven.length && !trovato; i++){
			var networkInArray = networkGiven[i];
			if (network.toString().localeCompare(networkInArray) == 0){
				trovato = true;
			}
		}
		if (trovato){
			return true;
		}
		else{
			networkGiven.push(network);
			return false;
		}
	},

	//get network address from NetworkAddress.txt
	setNetworkAddress : function (arrayN){
		var foundNetwork = false;
		var randomNetworkToSend;
		while (!foundNetwork) {
			var randomNetworkToSend = parseInt(Math.random() * 3);
			
			if (!module.exports.networkAlreadyGiven(networkProblem.normalizeNetworkAddress(arrayN[randomNetworkToSend]))){
				foundNetwork = true;
			}
			
		}
		return arrayN[randomNetworkToSend];
	},

	/*This function selects the trace of the problem to send to the student (related to
	  the difficulty he gave) and creates support array.
	 */
	difficultyFile : function (difficulty, req, res){

		networkGiven.length = 0;
		
		var randomFileToSend;
		switch (difficulty){
			case '1' :
				randomFileToSend = parseInt(((Math.random() * 3) + 1));
				break;
			case '2' :
				randomFileToSend = parseInt(((Math.random() * 1) + 1));
				break;
			default : break;
		}
		fs.readFile(path.join(__dirname+"/../Tracks/Track"+difficulty+"/track"+randomFileToSend+".txt"), function(err1, file1) {
			module.exports.problemPath="/../Tracks/Track"+difficulty+"/track"+randomFileToSend+".xml";
			if(err1) {
				// write an error response or nothing here
				res.writeHead(500, {'Content-Type': 'text/html'});
				res.end(errorCostant.internalServerError, "utf-8");
				return;
			}
			else {
				fs.readFile(path.join(__dirname+"/../ServerRes/NetworkAddress.txt"), function(err2, file2) {
					if (err2){
						// write an error response or nothing here
						res.writeHead(500, {'Content-Type': 'text/html'});
						res.end(errorCostant.internalServerError, "utf-8");
						return;
					}
					else {
						var array = file1.toString().split(" ");
						var arrayClient = "";
						var arrayXml = "";
						var array2 = file2.toString().split('\n');

						var numberVlan;

						for (var i = 0; i < array.length; i++) {
							array[i] = array[i].trim();
							switch (array[i]) {
								case "-network-" :
									array[i] = module.exports.setNetworkAddress(array2);
									arrayXml = arrayXml + "-network " + array[i];
									break;
								case "-number-" :
									array[i] = "";
									arrayXml = arrayXml + " -number " + array[i + 1];
									//First Simple Solution
									numberVlan = array[i+1];
									array[i + 1] = "";
									break;
								case "-hosts-" :
									var numberHosts = generateData.generateHost(difficulty, randomFileToSend);
									array[i] = numberHosts + " hosts";
									arrayXml = arrayXml + " -hosts " + array[i];
									break;
								case "-switch-" :
									var numberSwitch = generateData.generateSwitch(difficulty, randomFileToSend);
									array[i] = numberSwitch + " switch";
									arrayXml = arrayXml + " -switch " + array[i];
									break;
								case "-vlans-" :
									array[i] = numberVlan + " vlan";
									arrayXml = arrayXml + " -vlans " + array[i];
									break;
								case "-hub-" :
									//to demostrate work
									var numberHub = generateData.generateHub(difficulty, randomFileToSend);
									array[i] = numberHub + " hub";
									arrayXml = arrayXml + " -hubs " + array[i];
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
						module.exports.createXmlProblem(arrayXml.split(" "), module.exports.problemPath, res);
						res.writeHead(200, {'Content-Type': 'text/html'});
						res.end(arrayClient.toString(), "utf-8");
					}
				});
			}
		});
	}
	
}
