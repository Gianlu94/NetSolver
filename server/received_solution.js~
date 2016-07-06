/*
	This file contains the functions that are used to get data
	from the configuration given by user
 */

var xpath = require("xpath");

module.exports = {

	//HOST
	getNumberHost : function (userSFile){
		return (xpath.select("//Hosts/Number/text()", userSFile)).toString();
	},

	getListHost : function (userSFile){
		return xpath.select("//Host", userSFile);
	},

	//SWITCH
	getNumberSwitch : function (userSFile){
		return (xpath.select("//Switches/Number/text()", userSFile)).toString();
	},

	getListSwitch : function (userSFile){
		return (xpath.select("/UserSolution/Switches/Switch", userSFile));
	},

	getSwitchNames : function (userSFile){
		return (xpath.select("/UserSolution/Switches/Switch/Name", userSFile));
	},
	
	getSwitchPortsLengths : function(userSFile){
		return (xpath.select("/UserSolution/Switches/Switch/Ports/PortsLength", userSFile));	
	},

	getSwitchPortsNumber : function (userSFile){
		return (xpath.select("/UserSolution/Switches/Switch/Ports/Port/Number", userSFile));
	},

	getSwitchPortsType : function (userSFile){
		return (xpath.select("/UserSolution/Switches/Switch/Ports/Port/TypeConnection", userSFile));
	},

	getSwitchPortsConnectTo : function (userSFile){
		return (xpath.select("/UserSolution/Switches/Switch/Ports/Port/ConnectTo", userSFile));
	},

	getSwitchVlanConnected : function (userSFile){
		return (xpath.select("/UserSolution/Switches/Switch/Ports/Port/Vlan", userSFile));
	},

	//Vlans

	getNumberVlan : function (userSFile){
		return (xpath.select("//Vlans/Number/text()", userSFile)).toString();
	},

	getVlanId : function (userSFile){
		return (xpath.select("/UserSolution/Vlans/Vlan/Id", userSFile));
	},

	getVlanName : function (userSFile){
		return (xpath.select("/UserSolution/Vlans/Vlan/Name", userSFile));
	},

	//HUB

	getHubNumber : function (userSFile){
		return (xpath.select("//Hubs/Number/text()", userSFile)).toString();
	},

	getListHub : function (userSFile){
		return (xpath.select("/UserSolution/Hubs/Hub", userSFile));
	},

	getHubNames : function (userSFile){
		return (xpath.select("/UserSolution/Hubs/Hub/Name", userSFile));
	},

	getHubInterfaceLengths : function(userSFile){
		return (xpath.select("/UserSolution/Hubs/Hub/Interfaces/InterfacesLength", userSFile));
	},

	getHubPortsNumber : function (userSFile){
		return (xpath.select("/UserSolution/Hubs/Hub/Interfaces/Interface/Number", userSFile));
	},

	getHubPortsType : function (userSFile){
		return (xpath.select("/UserSolution/Hubs/Hub/Interfaces/Interface/TypeConnection", userSFile));
	},

	getHubPortsConnectTo : function (userSFile){
		return (xpath.select("/UserSolution/Hubs/Hub/Interfaces/Interface/ConnectTo", userSFile));
	}


}