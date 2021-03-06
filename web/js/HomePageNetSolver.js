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
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function(){
	Octopus.init();
});

//Model keeps data information and iteract witch switch.js
var Model = {
	//init number of rows of switch,host and create the first switch
	init : function(){
		this.row=-1;
		this.rowS=-1;
		this.rowVl=-1;
		this.rowHu=-1;
	},

	//Increment row number of switch and host and get it
	incrementAndGet : function(w){
		switch (w){
			case 'h' :
				this.row++;
				return this.row;
			case 's' :
				this.rowS++;
				return this.rowS;
			case 'v' :
				this.rowVl++;
				return this.rowVl;
			case 'u' :
				this.rowHu++;
				return this.rowHu;
			default : break;
				
		}
	},

	//decrement row's number of hosts and switches
	decrement : function(w){
		switch (w){
			case 'h' :
				if (this.row >= 1){
					this.row--;
				}
				break;
			case 's' :
				if (this.rowS >= 1){
					this.rowS--;
				}
				break;
			case 'v' :
				if (this.rowVl >= 1){
					this.rowVl--;
				}
				break;
			case 'u' :
				if (this.rowHu >= 1){
					this.rowHu--;
				}
				break;
			default : break;
				
		}
	},

	/*get the current row of host, switch, vlan and hub  (-1 = means that you can't delete
	the first host/switch*/
	rowIndex : function(w){
		switch (w){
			case 'h' :
				if (this.row > 0){
					return this.row;
				}
				else{
					return -1;
				}
			case 's' :
				if (this.rowS > 0){
					return this.rowS;
				}
				else{
					return -1;
				}
			case 'v' :
				if (this.rowVl > 0){
					return this.rowVl;
				}
				else{
					return -1;
				}
			case 'u' :
				if (this.rowHu > 0){
					return this.rowHu;
				}
				else{
					return -1;
				}
			default : break;
				
		}
	},

	insertSwitch : function(id){
		SwitchInterface.createSwitch(id);
	},

	resetArraySwitch : function(){
		SwitchInterface.resetArraySwitch();
	},
	
	getSwitchId : function (index){
		return SwitchInterface.getSwitchId(index);
	},
	
	deleteSwitch : function(id){
		SwitchInterface.deleteSwitch(id);
	},
	
	setSwitchPort : function(id,port){
		SwitchInterface.SetSwitchPort(id,port);
	},
	
	getSwitchPorts : function(id){
		return SwitchInterface.getSwitchPorts(id);
	},

	releaseSwitchPort : function(id, port){
		SwitchInterface.releaseSwitchPort(id, port);
	},
	
	getNumberOfSwitch : function(){
			return SwitchInterface.getArraySwitchLength();
	},
	
	setConnectToSwitchPort : function(id,port,idpc){
		SwitchInterface.setConnectToSwitchPort(id,port,idpc);
	},

	//Vlan
	createVlan : function (id){
		VlanInterface.createVlan(id);
	},

	deleteVlan : function (pos){
		VlanInterface.deleteVlan(pos);
	},

	getNameVlan : function (pos){
		return VlanInterface.getVlanName(pos);
	},

	getVlanIdentifier : function(pos){
		return VlanInterface.getVlanNumber(pos);
	},

	getNumberVlan : function(){
		return VlanInterface.getVlanLength();
	},

	checkIfVlanAlreadyExist : function (pos){
		return VlanInterface.checkIfVlanAlreadyExist(pos);
	},

	//Hub
	insertHub : function (id){
		HubInterface.createHub(id);
	},
	
	deleteHub : function (id) {
		HubInterface.deleteHub(id);
	},

	resetArrayHub : function(){
		HubInterface.resetArrayHub();
	},

	getHubId : function (id){
		return HubInterface.getHubId(id);
	},

	getHubPorts : function (id){
		return HubInterface.getHubPorts(id);
	},

	setHubPort : function(id,port){
		HubInterface.setHubPort(id,port);
	},

	releaseHubPort : function(id, port){
		HubInterface.releaseHubPort(id, port);
	},

	getNumberOfHub : function(){
		return HubInterface.getArrayHubLength();
	}

	
};

//Mediator between Model and View
var Octopus = {
	
	init : function(){
		Model.init();
		ViewHome.init();
	},
	
	incrementRow : function(w){
		return Model.incrementAndGet(w);
	},
	
	decrement : function(w){
		Model.decrement(w);
	},
	
	getRow : function(w){
		return Model.rowIndex(w);
	},

	insertSwitch : function(id){
		Model.insertSwitch(id);
	},

	resetArraySwitch : function(){
		Model.resetArraySwitch();
	},

	getSwitchId : function (index){
		return Model.getSwitchId(index);
	},
	
	deleteSwitch : function(id){
		Model.deleteSwitch(id);
	},
	
	setSwitchPort : function(id,port){
		Model.setSwitchPort(id,port);
	},
	
	getSwitchPorts : function (id){
		return Model.getSwitchPorts(id);
	},

	releaseSwitchPort : function(id, port){
		Model.releaseSwitchPort(id, port);
	},
	
	getNumberOfSwitch : function(){
		return Model.getNumberOfSwitch();
	},
	
	setConnectToSwitchPort : function(id,port,idpc){
		Model.setConnectToSwitchPort(id,port,idpc);
	},

	//Vlan
	createVlan : function (id){
		Model.createVlan(id);
	},

	deleteVlan : function (pos){
		Model.deleteVlan(pos);
	},

	getVlanIdentifier : function(pos){
		return Model.getVlanIdentifier(pos);
	},

	getNameVlan : function (pos){
		return Model.getNameVlan(pos);
	},

	getNumberVlan : function(){
		return Model.getNumberVlan();
	},

	checkIfVlanAlreadyExist : function (i) {
		return Model.checkIfVlanAlreadyExist(i);
	},

	//Hub
	insertHub : function (id){
		Model.insertHub(id);
	},

	deleteHub : function (id){
		Model.deleteHub(id);
	},

	resetArrayHub : function(){
		Model.resetArrayHub();
	},

	getHubId : function (id){
		return Model.getHubId(id);
	},

	setHubPort : function(id,port){
		Model.setHubPort(id,port);
	},

	releaseHubPort : function(id, port){
		Model.releaseHubPort(id, port);
	},

	getHubPorts : function (id){
		return Model.getHubPorts(id);
	},

	getNumberOfHub : function(){
		return Model.getNumberOfHub();
	}


};

//A view used to create and xml element (tag name,<content>)
var XmlViewCreator = {
	element: function(name,content){
		var xml;
		if (!content){
			xml='<' + name + '/>';
		}
		else {
			xml='<'+ name + '>' + content + '</' + name + '>';
		}
		return xml;
	}
};

//The ViewHome
var ViewHome = {
	// Param to keep the difficulty selected by user
	param:"",
	switchSelection:"",
	
	init : function(){
		
		/*function used to assign to a button a specific value
		  selected from its dropdown-menù
		 */
		var assignValueByDropDown = function (id,btnCl){

			$("#"+id+ " li a").click(function(e){
				switch (btnCl){
					//if I press the difficulty button -> set the new current difficulty
					case "btnD" :
						ViewHome.param=($(this).text());
						break;
					default :
						break;
					
				}
				//set the new value for the button
				$("."+btnCl+":first-child").html($(this).text()+"<span class='caret'> </span>");
				$("."+btnCl+":first-child").val($(this).text());
				
				
			});

		};

		//hide UserPanel Solution
		$("#panelYourSolution").hide();

		assignValueByDropDown("dropdownDI","btnD");

		
		//function to add new Host/Switch/Vlan
		var addRow = function(id,appendTo){
			$("#"+id).click(function(e){
				e.preventDefault();
				var rowD;
				switch (id){
					case "add_rowH" :
						var row = Octopus.incrementRow('h');

						// Grab the template script
						var theTemplateScript = $("#host-template").html();
						
						// Compile the template
						var theTemplate = Handlebars.compile(theTemplateScript);

						
						// Define our data object
						var context={
							"rowId": "hrow"+row,
							"idH": "name"+row,
							"nameH": "nam"+row,
							"valueH": "Host_"+row,
							"ipH": "ip"+row,
							"ipHname": "i"+row,
							"netH": "net"+row,
							"netHname": "ne"+row,
							"gatH": "gat"+row,
							"gatHname": "ga"+row,
							"serH": "ser"+row,
							"serHname": "se"+row
						};

						// Pass our data to the template
						var theCompiledHtml = theTemplate(context);

						// Add the compiled html to the page
						$('#'+appendTo).append(theCompiledHtml);
						
						
						break;
					case "add_rowS" :
						var row = Octopus.incrementRow('s');
						var rowSupport = row-row;

						// Grab the template script
						var theTemplateScript = $("#switch-template").html();

						// Compile the template
						var theTemplate = Handlebars.compile(theTemplateScript);


						// Define our data object
						var context={
							"srowId": "srow"+row+rowSupport,
							"sname": "sname"+row,
							"snam": "snam"+row,
							"valueS": "Switch_"+row,
							"btnSP": "btnSP"+row+rowSupport,
							"dropdownSP": "dropdownSP"+row+rowSupport,
							"btnST": "btnST"+row+rowSupport,
							"dropdownST": "dropdownST"+row+rowSupport,
							"btnSD": "btnSD"+row+rowSupport,
							"dropdownSD": "dropdownSD"+row+rowSupport,
							"btnSV": "btnSV"+row+rowSupport,
							"dropdownSV": "dropdownSV"+row+rowSupport,
							"add_row_connection": "add_row_connection"+row+rowSupport
						};

						// Pass our data to the template
						var theCompiledHtml = theTemplate(context);


						$("#"+appendTo).append(theCompiledHtml);

						//settings for the new row
						assignValueByDropDown("dropdownST"+row+rowSupport,"btnST"+row+rowSupport);
						addSubRow("add_row_connection"+row+rowSupport,"srow"+row+rowSupport, 's');
						//deleteSubRow("delete_row_connection"+row+rowSupport);


						portsAvailable("btnSP"+row+rowSupport,'s');
						assignPort("dropdownSP"+row+rowSupport,'s');

						seeDevice("btnSD"+row+rowSupport, 's');
						assignConnnect("dropdownSD"+row+rowSupport, 's');

						vlanAvailable("btnSV"+row+rowSupport);
						assignVlan("dropdownSV"+row+rowSupport);
						
						Octopus.insertSwitch(row);

						break;
					case "add_rowV":
						e.preventDefault();
						var row = Octopus.incrementRow('v');


						// Grab the template script
						var theTemplateScript = $("#vlan-template").html();

						// Compile the template
						var theTemplate = Handlebars.compile(theTemplateScript);


						// Define our data object
						var context={
							"vlanId": "vlrow"+row,
							"vNumber": "vNumber"+row,
							"vName": "vName"+row,
						};

						// Pass our data to the template
						var theCompiledHtml = theTemplate(context);

						//create and display the new vlan
						Octopus.createVlan(row);
						$("#"+appendTo).append(theCompiledHtml);


						break;
					case "add_rowHu" :
						e.preventDefault();
						var row = Octopus.incrementRow('u');
						var rowSupport = row-row;

						// Grab the template script
						var theTemplateScript = $("#hub-template").html();

						// Compile the template
						var theTemplate = Handlebars.compile(theTemplateScript);


						// Define our data object
						var context={
							"hubId": "hurow"+row+rowSupport,
							"hName": "hName"+row+rowSupport,
							"valueU": "Hub_"+row,
							"btnHI": "btnHI"+row+rowSupport,
							"btnHT": "btnHT"+row+rowSupport,
							"btnHC": "btnHC"+row+rowSupport,
							"dropdownHT": "dropdownHT"+row+rowSupport,
							"dropdownHC": "dropdownHC"+row+rowSupport,
							"dropdownHI": "dropdownHI"+row+rowSupport,
							"add_srow_hub": "add_srow_hub"+row+rowSupport

						};

						// Pass our data to the template
						var theCompiledHtml = theTemplate(context);

						//create and display the new hub
						$("#"+appendTo).append(theCompiledHtml);

						//settings for the new row
						addSubRow("add_srow_hub"+row+rowSupport,"hurow"+row+rowSupport, 'u');
						assignValueByDropDown("dropdownHT"+row+rowSupport,"btnHT"+row+rowSupport);

						portsAvailable("btnHI" + row + rowSupport, 'u');
						assignPort("dropdownHI" + row + rowSupport, 'u');

						seeDevice("btnHC"+row+rowSupport, 'u');
						assignConnnect("dropdownHC"+row+rowSupport, 'u');

						Octopus.insertHub(row);
						
						break;

							
					default : break;
				}
			});
		};

		//function to get the last "character number" of switch or host
		var getPartLength = function(code){
			if (isNaN(parseInt(code.slice(-3)))){
				return 2;
			}
			else{
				return 3;
			}
		};

		//function to get switch number (without port)
		var getDevicePart = function(length,id){
			if (length == 2){
				var last2 = id.slice(-2);
				return last2[0];
				
			}
			else if (length == 3){
				
				var last3 = id.slice(-3);
				var pair = last3[0]+""+last3[1];
				return pair;
			}
		};

		//function to get host number
		var getHostPart = function(host){
			if (isNaN(parseInt(host.slice(-3)))){
				if(isNaN(parseInt(host.slice(-2)))){
					return host.slice(-1);
				}
				else{
					return host.slice(-2);
				}
			}
			else{
				return host.slice(-3);
			}
			
		};

		
		//function to add Switch/Hubs subrows
		var addSubRow = function (id,srow,device){
			$("#"+id).click(function(e){
				e.preventDefault();
				var length = getPartLength(id);
				switch (device) {
					case 's' :
						var rowD;
						var last2_1 = getDevicePart(length, id);
						var last1 = parseInt(id.slice(-1));

						if (last1 == -1) {
							last1++;
						}

						if (last1 < 7) {
							$("#add_row_connection" + last2_1 + last1).hide();
							last1++;

							// Grab the template script
							var theTemplateScript = $("#switch2-template").html();

							// Compile the template
							var theTemplate = Handlebars.compile(theTemplateScript);


							// Define our data object
							var context = {
								"srowId": "srow" + last2_1 + last1,
								"btnSP": "btnSP" + last2_1 + last1,
								"dropdownSP": "dropdownSP" + last2_1 + last1,
								"btnST": "btnST" + last2_1 + last1,
								"dropdownST": "dropdownST" + last2_1 + last1,
								"btnSD": "btnSD" + last2_1 + last1,
								"dropdownSD": "dropdownSD" + last2_1 + last1,
								"btnSV": "btnSV" + last2_1 + last1,
								"dropdownSV": "dropdownSV" + last2_1 + last1,
								"add_row_connection": "add_row_connection" + last2_1 + last1,
								"delete_row_connection": "delete_row_connection" + last2_1 + last1
							};

							// Pass our data to the template
							var theCompiledHtml = theTemplate(context);

							//hide delete of the previous element
							last1--;
							$("#delete_row_connection" + last2_1 + last1).hide();

							$(theCompiledHtml).insertAfter("#srow" + last2_1 + last1);
							last1++;

							//settings for subrow
							addSubRow("add_row_connection" + last2_1 + last1, "srow" + last2_1 + last1, 's');
							deleteSubRow("delete_row_connection" + last2_1 + last1, 's');


							assignValueByDropDown("dropdownST" + last2_1 + last1, "btnST" + last2_1 + last1);

							portsAvailable("btnSP" + last2_1 + last1, 's');
							assignPort("dropdownSP" + last2_1 + last1, 's');

							seeDevice("btnSD" + last2_1 + last1,'s');
							assignConnnect("dropdownSD" + last2_1 + last1, 's');

							vlanAvailable("btnSV" + last2_1 + last1);
							assignVlan("dropdownSV" + last2_1 + last1);
						}
						break;
					case 'u':
						var last2_1 = getDevicePart(length, id);
						var last1 = parseInt(id.slice(-1));

						if (last1 == -1) {
							last1++;
						}

						if (last1 < 7) {
							$("#add_srow_hub" + last2_1 + last1).hide();
							last1++;

							// Grab the template script
							var theTemplateScript = $("#hub-template2").html();

							// Compile the template
							var theTemplate = Handlebars.compile(theTemplateScript);


							// Define our data object
							var context = {
								"hubId": "hurow"+last2_1+last1,
								"btnHI": "btnHI"+last2_1+last1,
								"btnHT": "btnHT"+last2_1+last1,
								"btnHC": "btnHC"+last2_1+last1,
								"dropdownHT": "dropdownHT"+last2_1+last1,
								"dropdownHC": "dropdownHC"+last2_1+last1,
								"dropdownHI": "dropdownHI"+last2_1+last1,
								"add_srow_hub": "add_srow_hub"+last2_1+last1,
								"delete_srow_hub": "delete_srow_hub"+last2_1+last1

							};

							// Pass our data to the template
							var theCompiledHtml = theTemplate(context);

							//hide delete of the previous element
							last1--;
							$("#delete_srow_hub" + last2_1 + last1).hide();

							$(theCompiledHtml).insertAfter("#hurow" + last2_1 + last1);
							last1++;

							//settings for subrow
							addSubRow("add_srow_hub" + last2_1 + last1, "hurow" + last2_1 + last1, 'u');
							deleteSubRow("delete_srow_hub" + last2_1 + last1, 'u');


							assignValueByDropDown("dropdownHT" + last2_1 + last1, "btnHT" + last2_1 + last1);

							portsAvailable("btnHI" + last2_1 + last1, 'u');
							assignPort("dropdownHI" + last2_1 + last1, 'u');

							seeDevice("btnHC"+last2_1+last1, 'u');
							assignConnnect("dropdownHC"+last2_1+last1, 'u');


						}
						break;
					default : break;
				}

				
			});
		};

		//function to release hosts/switches  in the "connect to" button
		var releaseHS = function(device){
			if (device!="Hosts/Devices"){
				if (device.indexOf("Port")>-1){
					var switchPort = device.split(":");

					//find switch and its port (to release)
					var lengthS = getPartLength(switchPort[0]);
					var last2S = getDevicePart(lengthS,switchPort[0]);
					var port = switchPort[1];

					var portN = port.charAt(port.indexOf('_')+1);
					if (device.indexOf("Switch") > -1) {
						Octopus.releaseSwitchPort(last2S, portN);
					}
					else{
						Octopus.releaseHubPort(last2S, portN);
					}
				}
				else{
					var hostPart=getHostPart(device);
					//host is available again
					$("#row"+hostPart).removeClass("SelectedH");
					$("#row"+hostPart).addClass("notSelectedH");
				}
			}
		};

		//function to delete the subrows of a switch (from its id)
		var deleteFollowingChildren = function(row,device){

			last1=1;
			lastC = row +""+ last1;

			//until exists a subrow
			switch (device){
				case 's' :
					while ($("#srow"+lastC).length){

						releaseHS($(".btnSD"+lastC).text());

						$("#srow"+lastC).remove();
						last1++;
						lastC = row + "" +last1;
					}
					break;
				case 'u':
					while ($("#hurow"+lastC).length){

						releaseHS($(".btnHC"+lastC).text());

						$("#hurow"+lastC).remove();
						last1++;
						lastC = row + "" +last1;
					}
					break;
				default : break;
			}



		};
		
		
		//function to delete Host/Switch 's rows
		var deleteRow = (function (id){
			$("#"+id).click(function(e){
				e.preventDefault();
				switch (id){
					case "delete_rowH" :

						var row = Octopus.getRow('h');
						var hostN = $("#name"+row).val();
						$("#hrow"+row).remove();

						//where it was setted up restore the defaul value
						$("button:contains("+hostN+")").html("Hosts/Devices"+
						"<span class='caret'> </span>");
						
						Octopus.decrement('h');
						break;

					case "delete_rowS" :

						var row = Octopus.getRow('s');
						var switchN = $("#sname"+row).val();
						var rowSupport = row-row;


						//delete all subrows connect to a switch
						deleteFollowingChildren(row, 's');

						releaseHS($(".btnSD"+row+rowSupport).text());
						$("#srow"+row+rowSupport).remove();
						$("button:contains("+switchN+")").html("Host/Devices"+
						"<span class='caret'> </span>");

						Octopus.deleteSwitch(row);
						Octopus.decrement('s');

						break;
					case "delete_rowV" :
						var row = Octopus.getRow('v');
						var vlanN = $("#vName"+row).val();

						$("#vlrow"+row).remove();

						$("button:contains("+vlanN+")").html("Host/Devices"+
							"<span class='caret'> </span>");
						Octopus.deleteVlan(row);
						Octopus.decrement('v');
					case "delete_rowHu" :
						var row = Octopus.getRow('u');
						var rowSupport = row-row;
						var hubN = $("#hName"+row+rowSupport).val();



						deleteFollowingChildren(row, 'u');
						releaseHS($(".btnHC"+row+rowSupport).text());
						$("#hurow"+row+"0").remove();
						$("button:contains("+hubN+")").html("Host/Devices"+
							"<span class='caret'> </span>");

						Octopus.deleteHub(row);
						Octopus.decrement('u');

						break;
					default : break;
				}
			});
		});

		//function to delete a single subrow of a Switch
		var deleteSubRow = function(id, device){
			$("#"+id).click(function(e){
				e.preventDefault();
				var length = getPartLength(id);
				var last2_1 = getDevicePart(length, id);
				var last1 = parseInt(id.slice(-1));
				switch(device) {
					case 's' :

						releaseHS($(".btnSD" + last2_1 + "" + last1).text());

						var PortToEliminate = $(".btnSP" + last2_1 + "" + last1).text();

						if (!isNaN(PortToEliminate)) {
							Octopus.releaseSwitchPort(last2_1, PortToEliminate);
						}
						$("#srow" + last2_1 + last1).remove();

						//show the add and delete button of the previous row
						last1--;
						$("#add_row_connection" + last2_1 + last1).show();
						$("#delete_row_connection" + last2_1 + last1).show();
						break;
					case 'u':

						releaseHS($(".btnHC" + last2_1 + "" + last1).text());

						var PortToEliminate = $(".btnHI" + last2_1 + "" + last1).text();
						$("#hurow" + last2_1 + last1).remove();

						if (!isNaN(PortToEliminate)) {
							Octopus.releaseHubPort(last2_1, PortToEliminate);
						}
						//$("#huIdrow" + last2_1 + last1).remove();

						//show the add and delete button of the previous row
						last1--;
						$("#add_srow_hub" + last2_1 + last1).show();
						$("#delete_srow_hub" + last2_1 + last1).show();
						break;
					default : break;
				}
			});
		};


		//function to create rows for the Connect To Field
		var createRowConnectTo =  function (id, device){

			devicesHtml = "";
			switch (device){
				case 's' :
					var ports = Octopus.getSwitchPorts(id);
					for (var j = 0; j < ports.length; j++) {

						devicesHtml = devicesHtml + "<li><a tabindex='-1' href='javascript:return false;' data-value='" +
							id + "" + ports[j] + "'>Switch_" + id + " : Port_" + ports[j] + "</a></li>";
					}
					break;
				case 'u':
					var ports = Octopus.getHubPorts(id);
					for (var j = 0; j < ports.length; j++) {

						devicesHtml = devicesHtml + "<li><a tabindex='-1' href='javascript:return false;' data-value='" +
							id + "" + ports[j] + "'>Hub_" + id + " : Port_" + ports[j] + "</a></li>";
					}
					break;
				default : break;
			}
			return devicesHtml;

		};
		
		//fuction to see the list of the available devices (in the connect to section)
		var seeDevice = function(id, device){
			$("."+id).click(function(){
				//number hosts
				var children = document.getElementById("hostConfiguration").children.length;
				var length = getPartLength(id);
				var last2_1 = getDevicePart(length,id);
				var last1 = parseInt(id.slice(-1));



				$("."+id).parent().find("ul").empty();

				//HostPart : create menù with available hosts
				var devicesHtml ="<li class='dropdown-submenu'><a tabindex='-1' href='javascript:return false;'>Hosts</a>"+
						"<ul class='dropdown-menu scrollable-menu'>";
				for (var i=0;i < children; i++){
					if($("#hrow"+i).hasClass("notSelectedH")){

						var nameH = $("#name"+i).val();
						devicesHtml = devicesHtml+"<li>"+
												"<a tabindex='-1'  href='javascript:return false;'  data-value='"+i+"' >"+nameH+
											"</a>"+
											"</li>";
					}
				}
				
				//Switch part : create menu with available switches
				devicesHtml =devicesHtml+"</ul></li><li class='dropdown-submenu'\n\
				><a tabindex='-1'\n\
				href='javascript:return false;'>Switches</a><ul class='dropdown-menu scrollable-menu'>";
				for (var i = 0; i < Octopus.getNumberOfSwitch(); i++ ){
					var idSwitch = Octopus.getSwitchId(i);
					//getting the available ports of a different switch
					if (device.indexOf('s') > -1) {
						if (idSwitch != last2_1) {

							devicesHtml = devicesHtml + createRowConnectTo(idSwitch, 's');

						}
					}
					else{

						devicesHtml = devicesHtml + createRowConnectTo(idSwitch,'s');

					}
				}

				//Hub Part
				devicesHtml =devicesHtml+"</ul></li><li class='dropdown-submenu'\n\
				><a tabindex='-1'\n\
				href='javascript:return false;'>Hub</a><ul class='dropdown-menu scrollable-menu'>";
				for (var i = 0; i < Octopus.getNumberOfHub(); i++ ){
					var idHub = Octopus.getHubId(i);
					if (device.indexOf('u') > -1) {

						//getting the available ports of a different hub
						if (idHub != last2_1) {

							devicesHtml = devicesHtml + createRowConnectTo(idHub,'u');

						}
					}
					else{

						devicesHtml = devicesHtml + createRowConnectTo(idHub,'u');

					}
				}
				devicesHtml = devicesHtml +"</ul></li>";

				//insert the menù
				$("."+id).parent().find("ul").append(devicesHtml);
				
			});
		};

		//function to assign available devices (for a switch)
		var assignConnnect = function(id,device){
			$("#"+id).on("click","li a", function(){

				//extract last characters of the id
				var length = getPartLength(id);
				var last2 = getDevicePart(length,id);
				var last1 = id.slice(-1);
				var lastC = last2+""+last1;
				var isSwitchPrevious = false;
				var isSwitchCurrent = false;
				var isInTabSwitch = false;
				var previouSelected;


				if (device === 's') isInTabSwitch = true;

				//previous selected (value on the button)
				if(isInTabSwitch){
					previouSelected = $(".btnSD" + lastC).text();
				}
				else{
					previouSelected = $(".btnHC" + lastC).text();
				}

				//new selected value
				var currentSelected = $(this).text();

				if (previouSelected.indexOf("Switch") > -1) isSwitchPrevious = true;
				if (currentSelected.indexOf("Switch") > -1) isSwitchCurrent = true;




				//The element is now available (to find what tyoe of element is)
				if (isNaN(previouSelected)){
					if(previouSelected.indexOf("Port")>-1){
						var arraySplit = previouSelected.split(":");

						//find switch and its port
						var lengthS = getPartLength(arraySplit[0]);
						var last2S = getDevicePart(length,arraySplit[0]);
						var port = arraySplit[1];
						var portN = port.charAt(port.indexOf('_')+1);
						if (isSwitchPrevious) {
							Octopus.releaseSwitchPort(last2S, portN);
						}
						else{

							Octopus.releaseHubPort(last2S,portN);
						}

					}
					else if (previouSelected.indexOf("Devices")==-1){
						if($("[value="+previouSelected+"]").parent().parent().hasClass("SelectedH")){
							$("[value="+previouSelected+"]").parent().parent().removeClass("SelectedH");
							$("[value="+previouSelected+"]").parent().parent().addClass("notSelectedH");
						}
					}
				}

				if (currentSelected.indexOf("Port")>-1){

					//set port of switch state busy
					arraySplit = currentSelected.split(":");
					lengthS = getPartLength(arraySplit[0]);
					last2S = getDevicePart(length,arraySplit[0]);
					port = arraySplit[1];
					portN = port.charAt(port.indexOf('_')+1);

					if(isSwitchCurrent) {
						Octopus.setSwitchPort(last2S, portN);
					}
					else {
						Octopus.setHubPort(last2S, portN);
					}


				}
				else{

					var hostPart=getHostPart(currentSelected);
					$("#hrow"+hostPart).removeClass("notSelectedH");
					$("#hrow"+hostPart).addClass("SelectedH");

				}
				
				if (isInTabSwitch){
					//setting the new value of the button
					$("."+"btnSD"+lastC+":first-child").html(currentSelected+"<span class='caret'> </span>");
					$("."+"btnSD"+lastC+":first-child").val(currentSelected);
				}
				else{
					//setting the new value of the button
					$("."+"btnHC"+lastC+":first-child").html(currentSelected+"<span class='caret'> </span>");
					$("."+"btnHC"+lastC+":first-child").val(currentSelected);
				}


			});
		};

		
		//function to manage ports' availability
		var portsAvailable = function(id, device){
			$("."+id).click(function(){

				var length = getPartLength(id);
				var last2_1 = getDevicePart(length,id);
				switch (device) {
					case 's' :
						//get the available ports given the id of the switch
						var arrayPorts = Octopus.getSwitchPorts(last2_1);

						//clean previous port (View)
						$("." + id).parent().find("ul").empty();

						//append the available port
						for (var i = 0; i < arrayPorts.length; i++) {
							var hostHtml = "<li>" +
								"<a href='javascript:return false;' data-value='" + arrayPorts[i] + "' >" + arrayPorts[i] +
								"</a>" +
								"</li>";
							$("." + id).parent().find("ul").append(hostHtml);

						}
						var hostHtml = "<li>" +
							"<a href='javascript:return false;' data-value='Port number' >" + "Port number" +
							"</a>" +
							"</li>";
						$("." + id).parent().find("ul").append(hostHtml);
						break;
					case 'u' :
						//get the available ports given the id of the hub
						var hubPorts = Octopus.getHubPorts(last2_1);

						//clean previous port (View)
						$("." + id).parent().find("ul").empty();

						//append the available port
						for (var i = 0; i < hubPorts.length; i++) {
							var hostHtml = "<li>" +
								"<a href='javascript:return false;' data-value='" + hubPorts[i] + "' >" + hubPorts[i] +
								"</a>" +
								"</li>";
							$("." + id).parent().find("ul").append(hostHtml);

						}
						var hostHtml = "<li>" +
							"<a href='javascript:return false;' data-value='Port number' >" + "Port number" +
							"</a>" +
							"</li>";
						$("." + id).parent().find("ul").append(hostHtml);

						break;
					default : break;
				}

			});
		};

		//function to set port from ports' list
		var assignPort = function(id, device){
			$("#"+id).on("click","li a", function(){

				var previousPort = $("#" + id).parent().find("button").text();
				var length = getPartLength(id);
				var last2 = getDevicePart(length, id);
				var last1 = id.slice(-1);
				var lastC = last2 + "" + last1;
				var newPort;
				switch (device) {
					case 's':
						//if it's a port (not default option)
						if (!isNaN(previousPort)) {
							Octopus.releaseSwitchPort(last2, previousPort);
						}

						newPort = $(this).text();

						Octopus.setSwitchPort(last2, newPort);
						$("." + "btnSP" + lastC + ":first-child").html(newPort + "<span class='caret'> </span>");
						$("." + "btnSP" + lastC + ":first-child").val(newPort);

						break;
					case 'u':
						//if it's a port (not default option)
						if (!isNaN(previousPort)) {
							Octopus.releaseHubPort(last2, previousPort);
						}

						newPort = $(this).text();
						Octopus.setHubPort(last2, newPort);
						$("." + "btnHI" + lastC + ":first-child").html(newPort + "<span class='caret'> </span>");
						$("." + "btnHI" + lastC + ":first-child").val(newPort);

						break;
					default :break;
				}
			});
		};

		//function to display available vlans
		var vlanAvailable = function(id){
			$("."+id).click(function(){

				var length = getPartLength(id);
				var last2_1 = getDevicePart(length,id);

				//clean previous vlans (View)
				$("."+id).parent().find("ul").empty();

				//append the available vlan
				for (var i=0;i < Octopus.getNumberVlan(); i++){
					var vlanName = Octopus.getNameVlan(i);
					var vlanIdentifier = Octopus.getVlanIdentifier(i);
					var duplicate = Octopus.checkIfVlanAlreadyExist(i);
					if ((vlanName!="")&&(vlanIdentifier!="")&& (!duplicate)) {
							var vlanHtml = "<li>" +
								"<a href='javascript:return false;' data-value='" + vlanName + " : '"+"access"+"' >" + vlanName + " : " +
									"access"+
								"</a>" +
								"</li>";
							$("." + id).parent().find("ul").append(vlanHtml);
					}

				}
				var vlanHtml = "<li>" +
					"<a href='javascript:return false;' data-value='trunk'>mode : trunk</a>"+
					"</a>" +
					"</li>"+
					"<li>" +
					"<a href='javascript:return false;' data-value='vlan'>Vlan</a>"+
					"</a>" +
					"</li>";;
				$("." + id).parent().find("ul").append(vlanHtml);

			});
		};

		//function to set vlan from list
		var assignVlan = function(id){
			$("#"+id).on("click","li a", function(){

				var length = getPartLength(id);
				var last2 = getDevicePart(length,id);
				var last1 = id.slice(-1);
				var lastC = last2+""+last1;


				var newVlan = $(this).text();

				$("."+"btnSV"+lastC+":first-child").html(newVlan+"<span class='caret'> </span>");
				$("."+"btnSV"+lastC+":first-child").val(newVlan);
			});
		};

		//clean problem's section
		$("#extended").append("");

		$("#compact").append("");

		//enable add and delete rows
		addRow("add_rowH","hostConfiguration");
		addRow("add_rowS","switchConfiguration");
		addRow("add_rowV","vlanConfiguration");
		addRow("add_rowHu","hubConfiguration");
		deleteRow("delete_rowH");
		deleteRow("delete_rowS");
		deleteRow("delete_rowV");
		deleteRow("delete_rowHu");

		//insert a minimum of 1 host/device/vlan
		$("#add_rowH").trigger("click");
		$("#add_rowS").trigger("click");
		$("#add_rowV").trigger("click");
		$("#add_rowHu").trigger("click");

		//reset all hosts in tab Host
		var resetHost = function(){
			var idFirst = $("#hrow0");
			for (var i = Octopus.getRow('h'); i >= 0; i--){
				$("#delete_rowH").trigger("click");
			}
			if ((idFirst).hasClass("SelectedH")){
				idFirst.removeClass("SelectedH");
				idFirst.addClass("notSelectedH");
			}
			idFirst.val("Host_0");
			$("#name0").val("Host_0");
			$("#ip0").val("");
			$("#net0").val("");
			$("#gat0").val("");
			$("#ser0").val("");
		};

		//reset all switch in tab Switch
		var resetSwitch = function(){
			for (var i = Octopus.getRow('s'); i > 0; i--){
				$("#delete_rowS").trigger("click");
			}

			deleteFollowingChildren("0",'s');
			Octopus.resetArraySwitch();

			$("#add_row_connection00").show();
			$("#sname0").text("Switch_0");
			$("#sname0").html("Switch_0 <span class="+"caret"+"></span>");
			$(".btnSP00").text("Port number");
			$(".btnSP00").html("Port number <span class="+"caret"+"></span>");
			$(".btnST00").text("Type");
			$(".btnST00").html("Type <span class="+"caret"+"></span>");
			$(".btnSD00").text("Hosts/Devices");
			$(".btnSD00").html("Hosts/Devices <span class="+"caret"+"></span>");
			$(".btnSV00").text("Vlan");
			$(".btnSV00").html("Vlan <span class="+"caret"+"></span>");


		};

		//reset all vlans in tab Vlan
		var resetVlan = function(){
			for (var i = Octopus.getRow('v'); i > 0; i--){
				$("#delete_rowV").trigger("click");
			}
			$("#vNumber0").val("");
			$("#vName0").val("");
			$(".btnVl0").text("Type");
			$(".btnVl0").html("Type <span class ="+"caret"+"></span>");


		};

		//reset all hubs
		var resetHub = function (){
			for (var i = Octopus.getRow('u'); i > 0; i--){
				$("#delete_rowHu").trigger("click");
			}

			deleteFollowingChildren("0",'u');
			Octopus.resetArrayHub();

			$("#add_srow_hub00").show();
			$("#hName00").text("Switch_0");
			$("#hName00").html("Switch_0 <span class="+"caret"+"></span>");
			$(".btnHI00").text("Interface");
			$(".btnHI00").html("Interface <span class="+"caret"+"></span>");
			$(".btnHT00").text("Type");
			$(".btnHT00").html("Type <span class="+"caret"+"></span>");
			$(".btnHC00").text("Hosts/Devices");
			$(".btnHC00").html("Hosts/Devices <span class="+"caret"+"></span>");
		}

		//delete solution
		$("#delete_all").click(function(e){
			e.preventDefault();
			resetHost()
			resetSwitch();
			resetVlan();
			resetHub();
		});

		//create the xml to send to server
		var createXml = function(){
			//HOST PART
			var children = document.getElementById("hostConfiguration").children.length-1;


			var ConfigurationXml;
			ConfigurationXml="<UserSolution>\n<Hosts>\n<Number>"+children+"</Number>\n";

			for (var i = 0;i<children;i++){

				//get host's info
				var hName = $("#name"+i).val();
				var hIpAddr = $("#ip"+i).val();
				var hNetM = $("#net"+i).val();
				var hGat = $("#gat"+i).val();
				var hSer = $("#ser"+i).val();

				ConfigurationXml = ConfigurationXml+"<Host>\n"+XmlViewCreator.element("Name",hName)+"\n"+
							XmlViewCreator.element("Ip",hIpAddr)+"\n"+
							XmlViewCreator.element("Netmask",hNetM)+"\n"+
							XmlViewCreator.element("Gateway",hGat)+"\n"+
							XmlViewCreator.element("Service",hSer)+"\n"
							+"</Host>\n";
			}
			ConfigurationXml = ConfigurationXml+"</Hosts>\n";

			//SWITCH PART
			var numberOfSwitch = Octopus.getNumberOfSwitch();
			ConfigurationXml = ConfigurationXml + "<Switches>\n\t"+XmlViewCreator.element("Number",numberOfSwitch);
			for (var i = 0; i < Octopus.getNumberOfSwitch(); i++){

				ConfigurationXml = ConfigurationXml + "\n\t<Switch>\n";
				var switchIdP = Octopus.getSwitchId(i);


				var sname = $("#sname"+switchIdP).val();

				ConfigurationXml = ConfigurationXml+"\t\t"+ XmlViewCreator.element("Name",sname)+"\n\t\t<Ports>\n";
				var portNumber = 0;
				var exit = false;
				for (var j = 0; j < 8 && !exit; j++){
					var switchPort = switchIdP+""+j;

					if ($("#srow"+switchPort).length) {
						var sport = $(".btnSP"+switchPort).text();

						var selectedConnection = $("#dropdownST" + switchIdP + j).parent().find("button").text();
						var connectTo = $("#dropdownSD" + switchIdP + j).parent().find("button").text();
						var vlan = $("#dropdownSV" + switchIdP + j).parent().find("button").text();

						ConfigurationXml = ConfigurationXml + "\t\t\t<Port>\n\t\t\t\t" + XmlViewCreator.element("Number", sport.trim()) +
							"\n\t\t\t\t" + XmlViewCreator.element("TypeConnection", selectedConnection.trim()) +
							"\n\t\t\t\t" + XmlViewCreator.element("ConnectTo", connectTo) +
							"\n\t\t\t\t" + XmlViewCreator.element("Vlan", vlan) +
							"\n\t\t\t</Port>\n";
						portNumber++;
					}
					else{
						exit=true;
					}
				}
				ConfigurationXml = ConfigurationXml + "\t\t\t<PortsLength>"+portNumber+"</PortsLength>"+"\n\t\t</Ports>\n\t</Switch>";

			}
			ConfigurationXml = ConfigurationXml+"\n</Switches>\n";


			//VLANs PART

			var numberVlans = Octopus.getNumberVlan();
			ConfigurationXml = ConfigurationXml + "<Vlans>\n\t"+XmlViewCreator.element("Number",numberVlans);
			for (var i = 0; i < numberVlans; i++){
				ConfigurationXml = ConfigurationXml + "\n\t<Vlan>";
				if (!Octopus.checkIfVlanAlreadyExist(i)){
					var idVlan = Octopus.getVlanIdentifier(i);
					var nameVlan = Octopus.getNameVlan(i);
					ConfigurationXml = ConfigurationXml +
					"\n\t\t" + XmlViewCreator.element("Id", idVlan) +
					"\n\t\t" + XmlViewCreator.element("Name", nameVlan);
				}
				ConfigurationXml = ConfigurationXml + "\n\t</Vlan>";
			}
			ConfigurationXml = ConfigurationXml + "\n</Vlans>\n";


			//HUB PART
			var numberOfHub = Octopus.getNumberOfHub();
			ConfigurationXml = ConfigurationXml + "<Hubs>\n\t"+XmlViewCreator.element("Number",numberOfHub);
			for (var i = 0; i < numberOfHub; i++){

				ConfigurationXml = ConfigurationXml + "\n\t<Hub>\n";
				var hubIdP = Octopus.getHubId(i);


				var hName = $("#hName"+hubIdP+"0").val();


				ConfigurationXml = ConfigurationXml+"\t\t"+ XmlViewCreator.element("Name",hName)+"\n\t\t<Interfaces>\n";
				var portNumber = 0;
				var exit = false;

				for (var j = 0; j < 8 && !exit; j++){
					var hubInterface = hubIdP+""+j;

					//if row exists
					if ($("#hurow"+hubInterface).length) {
						var hPort = $(".btnHI"+hubInterface).text();

						var selectedConnection = $("#dropdownHT" + hubInterface).parent().find("button").text();
						var connectTo = $("#dropdownHC" + hubInterface).parent().find("button").text();


						ConfigurationXml = ConfigurationXml + "\t\t\t<Interface>\n\t\t\t\t" + XmlViewCreator.element("Number", hPort.trim()) +
							"\n\t\t\t\t" + XmlViewCreator.element("TypeConnection", selectedConnection.trim()) +
							"\n\t\t\t\t" + XmlViewCreator.element("ConnectTo", connectTo) +
							"\n\t\t\t</Interface>\n";
						portNumber++;
					}
					else{
						exit=true;
					}
				}
				ConfigurationXml = ConfigurationXml + "\t\t\t<InterfacesLength>"+portNumber+"</InterfacesLength>"+"\n\t\t</Interfaces>\n\t</Hub>";

			}
			ConfigurationXml = ConfigurationXml+"\n</Hubs>\n</UserSolution>";


			return ConfigurationXml;
		};

		//request problem to server
		$("#getP").click(function(){
			if (ViewHome.param) {
				$("#panelYourSolution").show();
				var xhr = new XMLHttpRequest();
				xhr.open('GET', "http://localhost:3000/Tracks/?data=" + JSON.stringify({'difficulty': ViewHome.param}), true);
				xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

				//display the problem after received it
				xhr.addEventListener("readystatechange", processRequest, false);
				function processRequest(e) {
					if (xhr.readyState == 4) {
						if (xhr.status == 200) {
							$("#extended").empty();
							$("#extended").append(xhr.responseText);
						}
						else if (xhr.status == 500){
							alert(xhr.responseText);
						}
					}
				}
				xhr.send();
			}

		});

		//submit solution and manage report section
		$("#NetworkConfList").on('submit', function(e){ 
			e.preventDefault();
			var hostConfigurationXml = createXml();
			var xhr  = new XMLHttpRequest();
			xhr.open('POST',"http://localhost:3000/Solution",true);

			xhr.addEventListener("readystatechange", processRequest, false);
			function processRequest(e) {
				if (xhr.readyState == 4) {
					if (xhr.status == 200) {
						//no focus
						$("#hostH").removeClass("active");
						$("#hostsDe").removeClass("active");
						$("#switchH").removeClass("active");
						$("#switchDe").removeClass("active");
						$("#vlanH").removeClass("active");
						$("#vlanDe").removeClass("active");
						$("#hubH").removeClass("active");
						$("#hubDe").removeClass("active");

						//give focus to report section
						$("#reportH").addClass("active");
						$("#reportDe").addClass("active");

						//show server's response
						$("#reportDe").empty();
						$("#reportDe").html(xhr.responseText);
					}
					else if (xhr.status == 500){
						alert(xhr.responseText);
					}
				}	
			}


			xhr.send(hostConfigurationXml);
		});
		
	}
};

