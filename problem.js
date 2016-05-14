/*
    This file is used to deal with Object Problem created from the
    XML description of the problem
 */
var xpath = require("xpath");
var Netmask = require('netmask').Netmask
var path = require("path");
var fs = require("fs");
var util = require('util');

var arrayObjectProblem = [];
module.exports = {



    //This function extract data from problem's xml and create an object Problem
    createObjectProblem : function(doc){
        arrayObjectProblem = [];
        var numberNetworkProblem = (xpath.select("/Problem/Number/text()", doc)).toString();
		console.log("NUmbero Problema "+numberNetworkProblem);
        for (var i = 0; i < numberNetworkProblem; i++){
            var networkProblems = (xpath.select("//NetworkProblem", doc));
            var networkX = (xpath.select("//" + networkProblems[i].localName + "/Network", doc));
            var hostX = (xpath.select("//" + networkProblems[i].localName + "/Hosts", doc));

			//console.log("**********HOSTX "+hostX+ "Network "+networkX);
			var hostV = hostX[i].firstChild.data;
			var networkV = networkX[i].firstChild.data;
            var block = new Netmask(networkV);
			//console.log("----block.base "+block.base+" ----val "+networkV);
            var objectProblem = {network : networkV, hostLimit : hostV, host : hostV, hostnetmask : block.mask,
				broadcast : block.broadcast};
            arrayObjectProblem.push(objectProblem);
            //console.log("**NETOWRK    "+network);
            //console.log("**HOST    "+host);
            //console.log("Number network problem "+networkProblem.createAndInsertObjectProblem(networkV, hostV,doc));
        }
    },
	
    //normalize ip address
    normalizeIpAddress : function(ipA){
        var ipA2 = ipA.split(".");
        ipA="";
        for (var i = 0; i< ipA2.length; i++){
            //console.log("IPA "+ i +" = "+parseInt(ipA2[i]));
            if (i == ipA2.length-1){
                ipA = ipA + parseInt(ipA2[i]);
            }
            else{
                ipA = ipA + parseInt(ipA2[i])+".";
            }
        }
        return ipA
    },

	//get network address from NetworkAddress.txt
	getNetworkAddress : function(ipA){
		var ipA2 = ipA.split(".");
		ipA="";
		for (var i = 0; i< ipA2.length; i++){
			//console.log("IPA "+ i +" = "+parseInt(ipA2[i]));
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
			//var Object = arrayObjectProblem[i].toString()
			//console.log(util.inspect(arrayObjectProblem, false, null));
            total= parseInt(total)+parseInt(arrayObjectProblem[i].host);
        }
        return total;
    },

    //Check If the ip belongs to a network and not exceed limit number of host of that network
    belongNetwork : function(ip){
        for (var i = 0; i < arrayObjectProblem.length; i++){
            var objectProblem = arrayObjectProblem[i];
           // console.log("EXTRAC NETWROK  "+ objectProblem.network);
            var block = new Netmask(objectProblem.network);
           // console.log("EXTRAC NETWROK2  "+ block.base);
			//console.log("**IP "+ip +" block.contains : " +block.contains("192.168.100.001")+" block.base "+block.base);
            if (block.contains(ip)){
               // console.log("HOST BEFORE" + arrayObjectProblem[i].host);
                //arrayObjectProblem[i].host--;
                //console.log("HOST AFTER" + arrayObjectProblem[i].host);
                return true;
            }
        }
        return false;

    },

    //check if number of hosts exceed limit of the problem
    LimitExceed : function(ip){
        for (var i = 0; i < arrayObjectProblem.length; i++){
            var objectProblem = arrayObjectProblem[i];
            // console.log("EXTRAC NETWROK  "+ objectProblem.network);
            var block = new Netmask(objectProblem.network);
            // console.log("EXTRAC NETWROK2  "+ block.base);
            if ((block.contains(ip)) && (objectProblem.hostLimit > 0)){
                // console.log("HOST BEFORE" + arrayObjectProblem[i].host);
                arrayObjectProblem[i].hostLimit--;
                //console.log("HOST AFTER" + arrayObjectProblem[i].host);
                return false;
            }
        }
        return true;
    },

    //check if the following ip is equal to the network address
    isNetworkAddress : function(ip){
        //console.log("**IP "+ip);
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
		//console.log("**IP "+ip);
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
				//console.log("Netmask "+ netmask +" block.mask "+block.mask);
				if (netmask == block.mask){
					return true;
				}
			}
		}
		return false

	},

	//check if the following ip is equal to the broadcast address
	isBroadcastAddress : function(ip){
		//console.log("**IP "+ip);
		for (var i = 0; i < arrayObjectProblem.length; i++){
			var objectProblem = arrayObjectProblem[i];
			var block = new Netmask(objectProblem.network);
			if (ip == block.broadcast){
				return true;
			}
		}
		return false;
	},

    //get newtrok address of a specific host
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
		//console.log("TOTAL SWiTCH "+numberCommonSwitch);
		return numberCommonSwitch;
	},

	//VLANs PART :
	getNumberVlan : function (doc){
		var numberVlan = (xpath.select("/Problem/Vlan/text()",doc)).toString();
		return numberVlan;
	}
}