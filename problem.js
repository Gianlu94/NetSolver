/*
    This file is used to deal with Object Problem created from the
    XML description of the problem.
    At the same time it contains some function used to extract or do
    some checks on Problem's data.
 */
var xpath = require("xpath");
var Netmask = require('netmask').Netmask
var path = require("path");
var fs = require("fs");
var util = require('util');

var arrayObjectProblem = [];
var docProblem;
module.exports = {


    //This function extract data from problem's xml and create an object Problem
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

    //This function get the total number of hosts from the problem
    getTotalNumberHost : function(){
        var total = 0;
        for (var i = 0; i < arrayObjectProblem.length; i++){

            total= parseInt(total)+parseInt(arrayObjectProblem[i].host);
        }
        return total;
    },

    //Check If the ip belongs to a network and not exceed limit number of host of that network
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

	//VLANs PART :
	getNumberVlan : function (){
		var numberVlan = (xpath.select("/Problem/Vlan/text()",docProblem)).toString();
		return numberVlan;
	},

	//HUB PART :
	getNumberHub : function(){
		var numberHub = (xpath.select("/Problem/Hub/text()",docProblem)).toString();
		return numberHub;
	}
}