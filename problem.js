/*
    This file is used to deal with Object Problem created from the
    XML description of the problem
 */
var xpath = require("xpath");
var Netmask = require('netmask').Netmask

var arrayObjectProblem = [];
module.exports = {



    //This function extract data from problem's xml and create an object Problem
    createObjectProblem : function(doc){
        arrayObjectProblem = [];
        var numberNetworkProblem = (xpath.select("/Problem/Number/text()", doc)).toString();
        for (var i = 0; i < numberNetworkProblem; i++){
            var networkProblems = (xpath.select("//NetworkProblem", doc));
            var networkV = (xpath.select("//" + networkProblems[i].localName + "/Network/text()", doc)).toString();
            var hostV = (xpath.select("//" + networkProblems[i].localName + "/Hosts/text()", doc)).toString();
            var objectProblem = {network : networkV, host : hostV }
            arrayObjectProblem.push(objectProblem)
            //console.log("**NETOWRK    "+network);
            //console.log("**HOST    "+host);
            //console.log("Number network problem "+networkProblem.createAndInsertObjectProblem(networkV, hostV,doc));
        }
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
           // console.log("EXTRAC NETWROK  "+ objectProblem.network);
            var block = new Netmask(objectProblem.network);
           // console.log("EXTRAC NETWROK2  "+ block.base);
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
            if ((block.contains(ip)) && (objectProblem.host > 0)){
                // console.log("HOST BEFORE" + arrayObjectProblem[i].host);
                arrayObjectProblem[i].host--;
                //console.log("HOST AFTER" + arrayObjectProblem[i].host);
                return false;
            }
        }
        return true;
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
    }
}