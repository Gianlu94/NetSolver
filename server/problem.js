/*
    This file is used to deal with Object Problem created from the
    XML description of the problem.
    At the same time it contains some function used to extract or do
    some checks on the Problem's data.
 */
var xpath = require("xpath");
var Netmask = require('netmask').Netmask
var ipM = require("ip");
var querystring = require("query-string");
var url = require("url");
var path = require("path");
var fs = require("fs");
var util = require('util');


var docProblem;
var arrayObjectProblem = [];
module.exports = {



	//This function extract difficulty from URL
	extractDifficulty : function(req, res){
		var url2 = url.parse(req.url);
		var queryObj = querystring.parse(url2.query);
		var obj = JSON.parse(queryObj.data);
		var difficulty = obj.difficulty;
		return difficulty;
	},

    //This function extracts data from problem's xml and creates an object Problem
    createObjectProblem : function(doc){
        arrayObjectProblem = [];
		docProblem = doc;
        var numberNetworkProblem = (xpath.select("/Problem/Number/text()", doc)).toString();

        for (var i = 0; i < numberNetworkProblem; i++){
            var networkProblems = (xpath.select("//NetworkProblem", doc));
            var networkX = (xpath.select("//" + networkProblems[i].localName + "/Network", doc));
            var hostX = (xpath.select("//" + networkProblems[i].localName + "/Hosts", doc));

			var hostV = hostX[i].firstChild.data;
			var networkV = networkX[i].firstChild.data;
            var block = new Netmask(networkV);

            var objectProblem = {network : networkV, hostLimit : hostV, host : hostV, hostnetmask : block.mask,
				broadcast : block.broadcast};
            arrayObjectProblem.push(objectProblem);

        }
    },
	
    //normalize ip address
    normalizeIpAddress : function(ipA){
        var ipA2 = ipA.split(".");
        ipA="";
        for (var i = 0; i< ipA2.length; i++){

            if (i == ipA2.length-1){
                ipA = ipA + parseInt(ipA2[i]);
            }
            else{
                ipA = ipA + parseInt(ipA2[i])+".";
            }
        }
        return ipA
    },

	//normalize network Address
	normalizeNetworkAddress : function (networkAddress){
		var networkAddress_2 = networkAddress.split("/");

		return networkAddress_2;

	},

	//get network address from NetworkAddress.txt
	getNetworkAddress : function(ipA){
		var ipA2 = ipA.split(".");
		ipA="";
		for (var i = 0; i< ipA2.length; i++){

			if (i == ipA2.length-1){
				ipA = ipA + parseInt(ipA2[i]);
			}
			else{
				ipA = ipA + parseInt(ipA2[i])+".";
			}
		}
		return ipA
	},

    //This function gets the total number of hosts from the problem
    getTotalNumberHost : function(){
        var total = 0;
        for (var i = 0; i < arrayObjectProblem.length; i++){

            total= parseInt(total)+parseInt(arrayObjectProblem[i].host);
        }
        return total;
    },

    //Check if the ip belongs to a network and doesn't exceed limit number of host of that network
    belongNetwork : function(ip){
        for (var i = 0; i < arrayObjectProblem.length; i++){
            var objectProblem = arrayObjectProblem[i];
			var block = new Netmask(objectProblem.network);

            if (block.contains(ip)){

                return true;
            }
        }
        return false;

    },

    //check if number of hosts exceed limit of the problem
    LimitExceed : function(ip){
        for (var i = 0; i < arrayObjectProblem.length; i++){
            var objectProblem = arrayObjectProblem[i];

            var block = new Netmask(objectProblem.network);

            if ((block.contains(ip)) && (objectProblem.hostLimit > 0)){

                arrayObjectProblem[i].hostLimit--;

                return false;
            }
        }
        return true;
    },


	//check on a ip address
	checkIfIsValidAddress : function (ipA, htmlResponse, checkLimitExceed, row){


		if(ipA.firstChild == null) {
			htmlResponse = htmlResponse + "<li> ERROR row_"+row+": null field found</li>";
		}
		else {
			ipV = ipA.firstChild.data;
			if (!(ipM.isV4Format(ipV))){
				htmlResponse = htmlResponse + "<li> ERROR  row_"+row+": "+ipV + "is not a valid IPV4 Address</li>";
			}
			else {
				var ipV2 = module.exports.normalizeIpAddress(ipV);
				if (module.exports.isNetworkAddress(ipV2)) {
					htmlResponse = htmlResponse + "<li> ERROR  row_"+row+": "+ ipV + " is the Network Address</li>";
				}
				else if (module.exports.isNetmaskAddress(ipV2)) {
					htmlResponse = htmlResponse + "<li> ERROR row_"+row+": "+ ipV + " is the Netmask</li>";
				}

				else if (module.exports.isBroadcastAddress(ipV2)) {
					htmlResponse = htmlResponse + "<li> ERROR  row_"+row+": "+ ipV + " is the BroadCast Address</li>";
				}
				else if(!(module.exports.belongNetwork(ipV))){
					htmlResponse = htmlResponse +"<li>  ERROR row_"+row+": "+ ipV + " ip doesn't belong to any network</li>";
				}
				else if (checkLimitExceed) {
					if (module.exports.LimitExceed(ipV)) {
						htmlResponse = htmlResponse + "<li> ERROR row_"+row+": "+ ipV + " exceeds limit of host defined for its network</li>";
					}
				}
			}
		}


		return htmlResponse;

	},

	//This is the function that gradually creates an array with the duplicate ip
	checkDuplicateAddress : function(ipA, hostArray, hostArrayDuplicate){


		ipA = module.exports.normalizeIpAddress(ipA);

		if (hostArray.indexOf(ipA) != -1){
			if (hostArrayDuplicate.indexOf(ipA) == -1){
				hostArrayDuplicate.push(ipA);
			}
		}
		else{
			hostArray.push(ipA);
		}

	},

	//This is the function that checks if the given ip is valid or not
	checkIfIsValidNetmask : function(netmask, ipA, htmlResponse, row){
		if (netmask.firstChild == null){
			htmlResponse = htmlResponse + "<li> ERROR row_"+row+ ": null field found</li>";
		}
		else {
			if (ipA.firstChild != null){
				var ipV = ipA.firstChild.data;
				if (ipM.isV4Format(ipV)){
					var ipV2 = module.exports.normalizeIpAddress(ipV);
					if ((!module.exports.isNetworkAddress(ipV2)) && (!module.exports.isBroadcastAddress(ipV2)) &&
						module.exports.belongNetwork(ipV)) {
						if(!module.exports.isNetmaskAddressIp(netmask.firstChild.data, ipV2)){
							htmlResponse = htmlResponse + "<li> ERROR row_"+row+": "+  netmask + " is not the Netmask</li>";
						}

					}
				}
			}
		}
		return htmlResponse;
	},



    //check if the following ip is equal to the network address
    isNetworkAddress : function(ip){

        for (var i = 0; i < arrayObjectProblem.length; i++){
			var objectProblem = arrayObjectProblem[i];
			var block = new Netmask(objectProblem.network);
            if (ip == block.base){
                return true;
            }
        }
        return false;
    },

	//check if the following ip is equal to the netmask address
	isNetmaskAddress : function(ip){

		for (var i = 0; i < arrayObjectProblem.length; i++){
			var objectProblem = arrayObjectProblem[i];
			var block = new Netmask(objectProblem.network);
			if (ip == block.mask){
				return true;
			}
		}
		return false;
	},

	//check if the following ip is equal to the netmask address using index
	isNetmaskAddressIp : function (netmask, ip){
		for (var i = 0; i < arrayObjectProblem.length; i++){
			var objectProblem = arrayObjectProblem[i];
			var block = new Netmask(objectProblem.network);
			if (block.contains(ip)){

				if (netmask == block.mask){
					return true;
				}
			}
		}
		return false

	},

	//check if the following ip is equal to the broadcast address
	isBroadcastAddress : function(ip){

		for (var i = 0; i < arrayObjectProblem.length; i++){
			var objectProblem = arrayObjectProblem[i];
			var block = new Netmask(objectProblem.network);
			if (ip == block.broadcast){
				return true;
			}
		}
		return false;
	},

    //get newtork address of a specific host
    getNetworkAddress : function (ip){
        for (var i = 0; i < arrayObjectProblem.length; i++) {
            var objectProblem = arrayObjectProblem[i];
            var block = new Netmask(objectProblem.network);
                if (block.contains(ip)) {
                    return objectProblem.network;
                }
        }
        return null;
    },

	//SWITCH PART :

	getNumberCommonSwitches : function (doc){
		var numberCommonSwitch = (xpath.select("/Problem/Switch/text()", doc)).toString();

		return numberCommonSwitch;
	},

	//This is the function that checks if the fields of a switch are configured correctly
	checkIfDeviceIsSetted : function (port,typeConnection,connectTo,htmlResponse){
		connectTo = connectTo.trim();
		typeConnection = typeConnection.trim();
		port = port.trim();
		if (isNaN(port)){
			htmlResponse = htmlResponse + "<li> ERROR : A not defined Port/Interface was found</li>";
		}
		if ((typeConnection != "straight")&&(typeConnection != "cross")){
			htmlResponse = htmlResponse + "<li> ERROR : Type Connnection not defined</li>";
		}
		if ((connectTo=="Hosts/Devices")||(connectTo=="Hosts")||(connectTo=="Switches")||(connectTo == "Hub")){
			htmlResponse = htmlResponse + "<li> ERROR : Not connect to defined</li>";
		}
		else {
			if(connectTo.indexOf("Port")>-1){
				if ((typeConnection != "Type")&&(typeConnection != "cross")){
					htmlResponse = htmlResponse + "<li> ERROR : defined connect to (type) not correct</li>";
				}
			}
			else{
				if  ((typeConnection != "Type")&&(typeConnection != "straight")){
					htmlResponse = htmlResponse + "<li> ERROR : defined connect to (type) not correct</li>";
				}
			}
		}


		return htmlResponse;
	},

	//VLANs PART :
	getNumberVlan : function (){
		var numberVlan = (xpath.select("/Problem/Vlan/text()",docProblem)).toString();
		return numberVlan;
	},


	//This function check if vlan' s fields are null or not


	checkNullFieldsVlan : function(id, name, i){
		var htmlResponseSupport = ""
		if ((id == undefined) || (name == undefined)){
			htmlResponseSupport = htmlResponseSupport+"<li> ERROR row " + i + " : null field/s or duplicate vlans found</li>";
		}
		else if ((id.firstChild == null) || (name.firstChild == null)){
			htmlResponseSupport = htmlResponseSupport+"<li> ERROR row " + i + " : null field/s or duplicate vlans found</li>";
		}

		return htmlResponseSupport;
	},

	/*
	 This function check vlan's logic
	 */

	checkLogicConnectionVlan : function(objectTypeLink, devicesConnected, arrayVlanConnected, res){
		var htmlResponseSupport  = "";
		var numberVlans = module.exports.getNumberVlan();
		var arrayVlanFound = [];
		for (var i = 0; i < devicesConnected.length;i++){

			var nameVlan = arrayVlanConnected[i];

			if (nameVlan.indexOf("Vlan") > -1){
				htmlResponseSupport = htmlResponseSupport + "<li> ERROR : A not defined vlan found</li>";
				return htmlResponseSupport;
			}
			else if (devicesConnected[i].indexOf("Port") > -1){
				if (nameVlan.indexOf("mode") > -1) {
					if (objectTypeLink.Sl == 0) {
						htmlResponseSupport = htmlResponseSupport + "<li> WARNING : Redudant or unneccesary mode trunk found</li>";
					}
					else {
						objectTypeLink.Sl--;
					}
				}
				else{
					htmlResponseSupport = htmlResponseSupport + "<li> ERROR : Found vlan access instead of mode trunk</li>";
				}
			}
			else{
				if (nameVlan.indexOf("access") > -1) {
					if (objectTypeLink.Hl == 0) {
						htmlResponseSupport = htmlResponseSupport + "<li> WARNING : Redudant or unneccesary access mode defined</li>";
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
					htmlResponseSupport = htmlResponseSupport + "<li> ERROR : Found mode trunk instead of \< vlan \> : access</li>";
				}

			}

		}

		if (objectTypeLink.Hl > 0){
			htmlResponseSupport = htmlResponseSupport + "<li> ERROR: SwitchPort/s access was/were not configured</li>";
		}
		if (objectTypeLink.Sl > 0){
			htmlResponseSupport = htmlResponseSupport + "<li> ERROR: SwitchPort/s mode trunk was/were not configured </li>";
		}
		if(numberVlans != 0){
			htmlResponseSupport = htmlResponseSupport + "<li> ERROR: One or more vlan(s) were not configured</li>";
		}

		return htmlResponseSupport;
	},

	//HUB PART :
	getNumberHub : function(){
		var numberHub = (xpath.select("/Problem/Hub/text()",docProblem)).toString();
		return numberHub;
	},

	//This is the function that create the object links
	typeLink : function(doc){

		var nSwitch = module.exports.getNumberCommonSwitches(doc);
		var numberHost = module.exports.getTotalNumberHost();
		var numberHub = module.exports.getNumberHub();

		var Hlink = numberHost;
		var Slink = 0;
		var Ulink = 0;

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
		//duplicate (see details)
		if (numberHub == 1){
			Ulink = 0;
		}
		else if (numberHub == 2){
			Ulink = 1;
		}
		else if (numberHub == 3){
			Ulink = 2;
		}

		var Tlink = {Hl: numberHost, Sl : Slink, Ul : Ulink};

		return Tlink;
	},

	//This is the function that check connection betweeen switch/host
	checkLogicConnection : function (htmlResposeSupport,devicesConnected,TypeLink){
		for (var i = 0; i < devicesConnected.length;i++){

			if(devicesConnected[i].indexOf("Port")>-1){
				if(devicesConnected[i].indexOf("Hub") > -1){
					if (TypeLink.Ul == 0){
						htmlResposeSupport = htmlResposeSupport + "<li> WARNING : Redudant or unneccesary connection found</li>"
					}
					else {
						TypeLink.Ul--;
						console.log("Typelink "+TypeLink.Ul);
					}
				}
				else{
					if (TypeLink.Sl == 0){
						htmlResposeSupport = htmlResposeSupport + "<li> WARNING : Redudant or unneccesary connection found</li>"
					}
					else {
						TypeLink.Sl--;
					}
				}
			}
			else{
				TypeLink.Hl--;
			}
		}
		if(TypeLink.Hl > 0){
			htmlResposeSupport = htmlResposeSupport + "<li> ERROR : Host/s not connected yet</li>";
		}
		if(TypeLink.Sl > 0){
			htmlResposeSupport = htmlResposeSupport + "<li> ERROR : Switch/es not connected yet</li>";
		}
		if(TypeLink.Ul > 0){
			htmlResposeSupport = htmlResposeSupport + "<li> ERROR : Hub/s not connected yet</li>";
		}

		return htmlResposeSupport;
	}
}