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
			case 's' :
				if (this.rowS >= 1){
					this.rowS--;
				}
			case 'v' :
				if (this.rowVl >= 1){
					this.rowVl--;
				}
				
			default : break;
				
		}
	},

	/*get the current row of host and switches (-1 = means that you can't delete
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
			default : break;
				
		}
	},
	
	insertSwitch : function(id){
		SwitchInterface.createSwitch(id);
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

	getVlanSwitchPort : function(pos){
		return VlanInterface.getVlanSwitchPort(pos);
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

	getVlanSwitchPort : function(pos){
		return Model.getVlanSwitchPort(pos);
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
			
			$("#"+id+ " li a").click(function(){

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
							"rowId": "row"+row,
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
						addSubRow("add_row_connection"+row+rowSupport,"srow"+row+rowSupport);
						//deleteSubRow("delete_row_connection"+row+rowSupport);

						seeDevice("btnSD"+row+rowSupport);
						assignConnnect("dropdownSD"+row+rowSupport);

						portsAvailable("btnSP"+row+rowSupport);
						assignPort("dropdownSP"+row+rowSupport);

						vlanAvailable("btnSV"+row+rowSupport);
						assignVlan("dropdownSV"+row+rowSupport);
						console.log("INsert switch "+row);
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
							"btnVl": "btnVl"+row,
							"dropdownVl": "dropdownVl"+row

						};

						// Pass our data to the template
						var theCompiledHtml = theTemplate(context);

						//create and display the new vlan
						Octopus.createVlan(row);
						$("#"+appendTo).append(theCompiledHtml);

						//set dropdown switchPort
						assignValueByDropDown("dropdownVl"+row,"btnVl"+row);


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
		var getSwitchPart = function(length,id){
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

		
		//function to add Switch's subrows
		var addSubRow = function (id,srow){
			$("#"+id).click(function(e){
				e.preventDefault();
				var rowD;
				var length = getPartLength(id);
				var last2_1 = getSwitchPart(length,id);
				var last1 = parseInt(id.slice(-1));

				if (last1==-1){
					last1++;
				}

				if (last1 < 7){
					$("#add_row_connection"+last2_1+last1).hide();
					last1++;

					// Grab the template script
					var theTemplateScript = $("#switch2-template").html();

					// Compile the template
					var theTemplate = Handlebars.compile(theTemplateScript);


					// Define our data object
					var context={
						"srowId": "srow"+last2_1+last1,
						"btnSP": "btnSP"+last2_1+last1,
						"dropdownSP": "dropdownSP"+last2_1+last1,
						"btnST": "btnST"+last2_1+last1,
						"dropdownST": "dropdownST"+last2_1+last1,
						"btnSD": "btnSD"+last2_1+last1,
						"dropdownSD": "dropdownSD"+last2_1+last1,
						"btnSV": "btnSV"+last2_1+last1,
						"dropdownSV": "dropdownSV"+last2_1+last1,
						"add_row_connection": "add_row_connection"+last2_1+last1,
						"delete_row_connection": "delete_row_connection"+last2_1+last1
					};

					// Pass our data to the template
					var theCompiledHtml = theTemplate(context);

					//hide delete of the previous element
					last1--;
					$("#delete_row_connection"+last2_1+last1).hide();

					$(theCompiledHtml).insertAfter("#srow"+last2_1+last1);
					last1++;

					//settings for subrow
					addSubRow("add_row_connection"+last2_1+last1,"srow"+last2_1+last1);
					deleteSubRow("delete_row_connection"+last2_1+last1);

					
					assignValueByDropDown("dropdownST"+last2_1+last1,"btnST"+last2_1+last1);
					
					seeDevice("btnSD"+last2_1+last1);
					assignConnnect("dropdownSD"+last2_1+last1);
					
					portsAvailable("btnSP"+last2_1+last1);
					assignPort("dropdownSP"+last2_1+last1);

					vlanAvailable("btnSV"+last2_1+last1);
					assignVlan("dropdownSV"+last2_1+last1);
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
					var last2S = getSwitchPart(lengthS,switchPort[0]);
					var port = switchPort[1];

					var portN = port.charAt(port.indexOf('_')+1);

					Octopus.releaseSwitchPort(last2S,portN);
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
		var deleteFollowingChildren = function(id,row){

			last1=0;
			lastC = row +""+ last1;

			//until exists a subrow
			while ($("#srow"+lastC).length){

				releaseHS($(".btnSD"+lastC).text());

				$("#srow"+lastC).remove();
				last1++;
				lastC = row + "" +last1;
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
						$("#row"+row).remove();

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
						deleteFollowingChildren(id,row);

						$("button:contains("+switchN+")").html("Host/Devices"+
						"<span class='caret'> </span>");

						Octopus.deleteSwitch(row);
						Octopus.decrement('s');

						break;
					case "delete_rowV" :
						var row = Octopus.getRow('v');
						$("#vlrow"+row).remove();
						Octopus.deleteVlan(row);
						Octopus.decrement('v')


						break;
					default : break;
				}
			});
		});

		//function to delete a single subrow of a Switch
		var deleteSubRow = function(id){
			$("#"+id).click(function(e){
				e.preventDefault();

				var length = getPartLength(id);
				var last2_1 = getSwitchPart(length,id);
				var last1 = parseInt(id.slice(-1));
				
				releaseHS($(".btnSD"+last2_1+""+last1).text());

				var PortToEliminate = $(".btnSP"+last2_1+""+last1).text();
				if (!isNaN(PortToEliminate)){
					Octopus.releaseSwitchPort(last2_1,PortToEliminate);
				}
				$("#srow"+last2_1+last1).remove();

				//show the add and delete button of the previous row
				last1--;
				$("#add_row_connection"+last2_1+last1).show();
				$("#delete_row_connection"+last2_1+last1).show();	
			});
		}
		
		//fuction to see the list of the available devices (in the connect to section)
		var seeDevice = function(id){
			$("."+id).click(function(){
				//number hosts
				var children = document.getElementById("hostConfiguration").children.length;
				var length = getPartLength(id);
				var last2_1 = getSwitchPart(length,id);
				var last1 = parseInt(id.slice(-1));



				$("."+id).parent().find("ul").empty();

				
				//HostPart : create menù with available hosts
				var devicesHtml ="<li class='dropdown-submenu'><a tabindex='-1' href='#'>Hosts</a>"+
						"<ul class='dropdown-menu scrollable-menu'>";
				for (var i=0;i < children; i++){
					if($("#row"+i).hasClass("notSelectedH")){

						var nameH = $("#name"+i).val();
						devicesHtml = devicesHtml+"<li>"+
												"<a tabindex='-1'  href='#'  data-value='"+i+"' >"+nameH+
											"</a>"+
											"</li>";
					}
				}
				
				//Switch part : create menu with available switches
				devicesHtml =devicesHtml+"</ul></li><li class='dropdown-submenu'\n\
				><a tabindex='-1'\n\
				href='#'>Switches</a><ul class='dropdown-menu scrollable-menu'>";
				for (var i = 0; i < Octopus.getNumberOfSwitch(); i++ ){
					var idSwitch = Octopus.getSwitchId(i);

					//getting the available ports of a different switch
					if (idSwitch != last2_1){

						var ports = Octopus.getSwitchPorts(idSwitch);
						for (var j = 0; j<ports.length; j++){

							devicesHtml = devicesHtml + "<li><a tabindex='-1' href='#' data-value='"+
									idSwitch+""+ports[j]+"'>Switch_"+idSwitch+" : Port_"+ports[j]+"</a></li>";
						}

					}
				}
				devicesHtml = devicesHtml +"</ul></li>";

				//insert the menù
				$("."+id).parent().find("ul").append(devicesHtml);
				
			});
		};

		//function to assign available devices (for a switch)
		var assignConnnect = function(id){
			$("#"+id).on("click","li a", function(){

				//extract last characters of the id
				var length = getPartLength(id);
				var last2 = getSwitchPart(length,id);
				var last1 = id.slice(-1);
				var lastC = last2+""+last1;

				//previous selected (value on the button)
				var previouSelected = $(".btnSD"+lastC).text();

				//new selected value
				var currentSelected = $(this).text();

				//The element is now available (to find what tyoe of element is)
				if (isNaN(previouSelected)){
					if(previouSelected.indexOf("Port")>-1){
						var arraySplit = previouSelected.split(":");

						//find switch and its port
						var lengthS = getPartLength(arraySplit[0]);
						var last2S = getSwitchPart(length,arraySplit[0]);
						var port = arraySplit[1];
						var portN = port.charAt(port.indexOf('_')+1);

						Octopus.releaseSwitchPort(last2S,portN);

					}
					else if (previouSelected.indexOf("Devices")==-1){
						if($("[value="+previouSelected+"]").parent().parent().hasClass("SelectedH")){
							$("[value="+previouSelected+"]").parent().parent().removeClass("SelectedH");
							$("[value="+previouSelected+"]").parent().parent().addClass("notSelectedH");
						}
					}
				}

				//if it's a switch
				if (currentSelected.indexOf("Port")>-1){

					//set port of switch state busy
					arraySplit = currentSelected.split(":");
					lengthS = getPartLength(arraySplit[0]);
					last2S = getSwitchPart(length,arraySplit[0]);
					port = arraySplit[1];
					portN = port.charAt(port.indexOf('_')+1);

					Octopus.setSwitchPort(last2S,portN);


				}
				else{

					var hostPart=getHostPart(currentSelected);
					$("#row"+hostPart).removeClass("notSelectedH");
					$("#row"+hostPart).addClass("SelectedH");

				}

				//setting the new value of the button
				$("."+"btnSD"+lastC+":first-child").html($(this).text()+"<span class='caret'> </span>");
				$("."+"btnSD"+lastC+":first-child").val($(this).text());



			});
		};

		
		//function to manage ports' availability
		var portsAvailable = function(id){
			$("."+id).click(function(){

				var length = getPartLength(id);
				var last2_1 = getSwitchPart(length,id);

				//get the available ports given the id of the switch
				var arrayPorts = Octopus.getSwitchPorts(last2_1);

				//clean previous port (View)
				$("."+id).parent().find("ul").empty();

				//append the available port
				for (var i=0;i < arrayPorts.length; i++){
						var hostHtml = "<li>"+
											"<a href='#' data-value='"+arrayPorts[i]+"' >"+arrayPorts[i]+
											"</a>"+
										"</li>";
						$("."+id).parent().find("ul").append(hostHtml);	

				}
				
			});
		};

		//function to set port from ports' list
		var assignPort = function(id){
			$("#"+id).on("click","li a", function(){

				var previousPort = $("#"+id).parent().find("button").text();

				var length = getPartLength(id);
				var last2 = getSwitchPart(length,id);
				var last1 = id.slice(-1);
				var lastC = last2+""+last1;

				//if it's a port (not default option)
				if (!isNaN(previousPort)){
					Octopus.releaseSwitchPort(last2,previousPort);
				}

				var newPort = $(this).text();
				Octopus.setSwitchPort(last2,newPort);

				$("."+"btnSP"+lastC+":first-child").html(newPort+"<span class='caret'> </span>");
				$("."+"btnSP"+lastC+":first-child").val(newPort);
			});
		};

		//function to display available vlans
		var vlanAvailable = function(id){
			$("."+id).click(function(){

				var length = getPartLength(id);
				var last2_1 = getSwitchPart(length,id);

				//clean previous vlans (View)
				$("."+id).parent().find("ul").empty();

				//append the available port
				for (var i=0;i < Octopus.getNumberVlan(); i++){
					var vlanName = Octopus.getNameVlan(i);
					var vlanSwitchPort = Octopus.getVlanSwitchPort(i);
					var vlanIdentifier = Octopus.getVlanIdentifier(i);
					if ((vlanName!="")&&(vlanIdentifier!="")&&(vlanSwitchPort!="")&&
						(vlanSwitchPort.indexOf("Type")==-1)) {
							var vlanHtml = "<li>" +
								"<a href='#' data-value='" + vlanName + " : "+vlanSwitchPort+"' >" + vlanName + " : " +
									vlanSwitchPort+
								"</a>" +
								"</li>";
							$("." + id).parent().find("ul").append(vlanHtml);
					}

				}
				var vlanHtml = "<li>" +
					"<a href='#' data-value='trunk'>mode : trunk</a>"+
					"</a>" +
					"</li>";
				$("." + id).parent().find("ul").append(vlanHtml);

			});
		};

		//function to set vlan from list
		var assignVlan = function(id){
			$("#"+id).on("click","li a", function(){

				//var newVlan = $("#"+id).parent().find("button").text();

				var length = getPartLength(id);
				var last2 = getSwitchPart(length,id);
				var last1 = id.slice(-1);
				var lastC = last2+""+last1;


				var newVlan = $(this).text();
				//Octopus.setSwitchPort(last2,newPort);

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
		deleteRow("delete_rowH");
		deleteRow("delete_rowS");
		deleteRow("delete_rowV");

		//insert a minimum of 1 host/device/vlan
		$("#add_rowH").trigger("click");
		$("#add_rowS").trigger("click");
		$("#add_rowV").trigger("click");

		//create the xml to send to server
		var createXml = function(){
			//HOST PART
			var children = document.getElementById("hostConfiguration").children.length-1;
			console.log("NUMber HOst "+children);

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

				console.log("ID to Xml "+switchIdP);
				//var lengthS = getPartLength(switchIdP);
				//var last2S = getSwitchPart(length,switchIdP);

				//get switch's info
				//var row = Octopus.getRow('s');

				var sname = $("#sname"+switchIdP).val();
				console.log("Name Switch :"+ switchIdP +"0 "+sname);
				//var Ports = Octopus.getSwitchBusyPorts(switchIdP);

				ConfigurationXml = ConfigurationXml+"\t\t"+ XmlViewCreator.element("Name",sname)+"\n\t\t<Ports>\n";
				var portNumber = 0;
				var exit = false;
				for (var j = 0; j < 8 && !exit; j++){
					var switchPort = switchIdP+""+j;
					console.log("SWITCHPORT "+switchPort);
					if ($("#srow"+switchPort).length) {
						var sport = $(".btnSP"+switchPort).text();
						//console.log("Switch "+switchIdP+j+" Port"+ sport);
						var selectedConnection = $("#dropdownST" + switchIdP + j).parent().find("button").text();
						var connectTo = $("#dropdownSD" + switchIdP + j).parent().find("button").text();
						var vlan = $("#dropdownSV" + switchIdP + j).parent().find("button").text();
						console.log("********Port " + selectedConnection);
						console.log("********Port2 " + connectTo);
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
			ConfigurationXml = ConfigurationXml+"\n</Switches>\n</UserSolution>";
			//hostConfigurationXml = hostConfigurationXml+"</Hosts>";
			console.log(ConfigurationXml);
			return ConfigurationXml;
		};

		//request problem to server
		$("#getP").click(function(){
			$("#panelYourSolution").show();
			var xhr  = new XMLHttpRequest();
			xhr.open('GET',"http://localhost:3000/Tracer/?data="+JSON.stringify({'difficulty':ViewHome.param}),true);
			xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

			//display the problem after received it
			xhr.addEventListener("readystatechange", processRequest, false);
			function processRequest(e) {
				console.log("CLIENT received respone");
				if (xhr.readyState == 4 && xhr.status == 200) {
					$("#extended").empty();
					$("#extended").append(xhr.responseText);
				}
			}
			xhr.send();

		});

		//submit solution and manage report section
		$("#NetworkConfList").on('submit', function(e){ 
			e.preventDefault();
			var hostConfigurationXml = createXml();
			var xhr  = new XMLHttpRequest();
			xhr.open('POST',"http://localhost:3000/Solution",true);

			xhr.addEventListener("readystatechange", processRequest, false);
			function processRequest(e) {
				if (xhr.readyState == 4 && xhr.status == 200) {

					//no focus
					$("#hostH").removeClass("active");
					$("#hostsDe").removeClass("active");
					$("#switchH").removeClass("active");
					$("#switchDe").removeClass("active");

					//give focus to report section
					$("#reportH").addClass("active");
					$("#reportDe").addClass("active");

					//show server's response
					console.log("Server Response ",xhr.responseText);
					$("#reportDe").empty();
					$("#reportDe").html(xhr.responseText);
				}	
			}


			xhr.send(hostConfigurationXml);
			console.log(hostConfigurationXml);
		});
		
	}
};

