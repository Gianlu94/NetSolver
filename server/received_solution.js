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
