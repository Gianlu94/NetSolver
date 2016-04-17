/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function(){
	Octopus.init();
});

var Model = {
	init : function(){
		this.row=0;
		this.rowS=0;
		SwitchInterface.init();
	},
	
	incrementAndGet : function(w){
		switch (w){
			case 'h' :
				this.row++;
				return this.row;
			case 's' :
				this.rowS++;
				return this.rowS;
			default : break;
				
		}
	},
	
	decrement : function(w){
		switch (w){
			case 'h' :
				if (this.row >= 1){
					this.row--;
					//alert("***Decrement"+this.row);
				}
			case 's' :
				if (this.rowS >= 1){
					this.rowS--;
					//alert("***Decrement"+this.row);
				}
				
			default : break;
				
		}
	},
	
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
	}
	
};

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
	
	
}


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

var ViewHome = {
	param:"",
	switchSelection:"",
	
	init : function(){
		
		
		var assignValueByDropDown = function (id,btnCl){
			switch (btnCl){
				case "btnD" :
					ViewHome.param=($(this).text());
					break;
				default : 
					console.log("****ID : "+id+" btnCl: "+btnCl);
					break;
					
			}
			
			$("#"+id+ " li a").click(function(){
				
				console.log("I'm here");
				$("."+btnCl+":first-child").html($(this).text()+"<span class='caret'> </span>");
				$("."+btnCl+":first-child").val($(this).text());
				console.log("ID "+$(this).text());
				
				
			});
			
			/*$("#"+id).click(function(){
				//alert(this.text);
				//$(".btnD:first-child").text($(this).text())
				//ViewHome.param = this.text();
				//alert(ViewHome.param);
					
				$("."+btnCl+":first-child").html($(this).text()+"<span class='caret'> </span>");
				$("."+btnCl+":first-child").val($(this).text());
				console.log("ID "+$(this).text());
				
				//alert(ViewHome.param);
				//ViewHome.param = this.text();
			});
				*/
		};
		
		assignValueByDropDown("dropdownDI","btnD");
		//assignValueByDropDown("dropdownSP00","btnSP00");
		
		assignValueByDropDown("dropdownST","btnST00");
		assignValueByDropDown("dropdownSD00","btnSD00");
		/*$("#dropdownDI li a").click(function(){
			//alert(this.text);
			//$(".btnD:first-child").text($(this).text())
			//ViewHome.param = this.text();
			//alert(ViewHome.param);
			
			$(".btnD:first-child").html($(this).text()+"<span class='caret'></span>");
			$(".btnD:first-child").val($(this).text());
			ViewHome.param=($(this).text());
			//alert(ViewHome.param);
			//ViewHome.param = this.text();
		});
		*/
		
		$("#getP").click(function(){
			$("#panelYourSolution").show();
			var xhr  = new XMLHttpRequest();
			//var param = "difficulty="+ViewHome.param;
			xhr.open('GET',"http://localhost:3000/Tracer/?data="+JSON.stringify({'difficulty':ViewHome.param}),true);
			//xhr.open('POST',"http://localhost:3000/Tracer",true);
			xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
			//xhr.setRequestHeader('Content-Type','application/json;charset=UTF-8');
			xhr.addEventListener("readystatechange", processRequest, false);
			function processRequest(e) {
				if (xhr.readyState == 4 && xhr.status == 200) {
					$("#extended").empty();
					$("#extended").append(xhr.responseText);
				}	
			}

			//var data = {'difficulty':'zero'};
			xhr.send();
			//xhr.send("data="+JSON.stringify({difficulty:'zero'}));
			//xhr.send("data="+JSON.stringify({'difficulty':'zero'}));//+JSON.stringify(data));
		});
		
		$("#panelYourSolution").hide();
		
		/*$("#getP").click(function(){
			$("#extended").load("./text.txt");
		});*/
		
		//function to add new Host/Switch
		var addRow = function(id,appendTo){
			$("#"+id).click(function(e){
				e.preventDefault();
				var rowD;
				switch (id){
					case "add_rowH" :
						var row = Octopus.incrementRow('h');
						rowD = "<tr id='row"+row+"' class='notSelectedH' >"+
							"<td><input type='text' id='name"+row+"' name = 'nam"+row+
							"' placeholder='HostName' class='form-control' value='Host_"+row+"' /></td>"+
							"<td><input type='text' id='ip"+row+"' name = 'i"+row+
							"' placeholder='Ip address' class='form-control'/></td>"+
							"<td><input type='text' id='net"+row+"' name = 'ne"+row+
							"' placeholder='Netmask' class='form-control'/></td>"+
							"<td><input type='text' id='gat"+row+"' name = 'ga"+row+
							"' placeholder='Gateway' class='form-control'/></td>"+
							"<td><input type='text' id='ser"+row+"' name = 'se"+row+
							"' placeholder='Service' class='form-control'/></td>";
						$("#"+appendTo).append(rowD);
						break;
					case "add_rowS" :
						var row = Octopus.incrementRow('s');
						var rowSupport = row-row;
						rowD = "<tr id='srow"+row+rowSupport+"'>"+
							"<td><input type='text' id='sname"+row+"' name = 'snam"+row+
							"' placeholder='Switch Name' class='form-control' value='Switch_"+row+"'/></td>"+
							"<td><div class='dropdown'>"+
								"<button class='btn btnSP"+row+rowSupport+" btn-default dropdown-toggle'"+
								"type='button' data-toggle='dropdown'>Port number"+
								 "<span class='caret'></span></button>"+
								 "<ul class='dropdown-menu' id='dropdownSP"+row+rowSupport+"' >"+
									"<li><a href='#' data-value='1'>1</a></li>"+
									"<li><a href='#' data-value='2'>2</a></li>"+
									"<li><a href='#' data-value='3'>3</a></li>"+
									"<li><a href='#' data-value='4'>4</a></li>"+
									"<li><a href='#' data-value='5'>5</a></li>"+
									"<li><a href='#' data-value='6'>6</a></li>"+
									"<li><a href='#' data-value='7'>7</a></li>"+
									"<li><a href='#' data-value='8'>8</a></li>"+
								"</ul>"+
								"</div>"+
							"</td>"+
							"<td>"+
							"<div class='dropdown'>"+
								"<button  class='btn btnST"+row+rowSupport+" btn-default "+
									"dropdown-toggle' type='button'"+
										"data-toggle='dropdown'>Type"+
											"<span class='caret'></span>"+
												"</button>"+
												"<ul class='dropdown-menu' id='dropdownST"+row+rowSupport+"' >"+
													"<li><a href='#' "+ 
														"data-value='straight'>straight</a></li>"+
													"<li><a href='#' data-value='cross'>cross</a></li>"+
												"</ul>"+
							"</div><td>"+
							"<div class='dropdown'>"+
								"<button  class='btn btnSD"+row+rowSupport+" btn-default "+
									"dropdown-toggle' type='button'"+
										"data-toggle='dropdown'>Hosts/Devices<span class='caret'></span></button>"+
												"<ul class='dropdown-menu' id='dropdownSD"+row+rowSupport+"' >"+
												"</ul>"+
							"</div></td>"+
							"<td>"+
								"<button id='add_row_connection"+row+rowSupport+"' class='btn btn-success pull-left'>+</button>"+
							"</td>"
							;
							$("#"+appendTo).append(rowD);
							//assignValueByDropDown("dropdownSP"+row+rowSupport,"btnSP"+row+rowSupport);
							assignValueByDropDown("dropdownST"+row+rowSupport,"btnST"+row+rowSupport);
							addSubRow("add_row_connection"+row+rowSupport,"srow"+row+rowSupport);
							deleteSubRow("delete_row_connection"+row+rowSupport);
							
							Octopus.insertSwitch(row+rowSupport);
							/*for (var i = 0; i<arraySwitch.length;i++){
								var Switch = arraySwitch[i];
								console.log("Switch " + Switch.idS);
							}
							*/
							seeDevice("btnSD"+row+rowSupport);
							assignConnnect("dropdownSD"+row+rowSupport);
							
							portsAvailable("btnSP"+row+rowSupport);
							assignPort("dropdownSP"+row+rowSupport);
							
							break;
							
					default : break;
				}
			});
		};
		
		var getPartLength = function(code){
			if (isNaN(parseInt(code.slice(-3)))){
				return 2;
			}
			else{
				return 3;
			}
		};
		
		var getSwitchPart = function(length,id){
			if (length == 2){
				var last2 = id.slice(-2);
				return last2[0];
				
			}
			else if (length == 3){
				
				var last3 = id.slice(-3);
				var pair = last3[0]+""+last3[1];
				return pair;
				//return pair;
			}
		};
		
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
		
		var releaseHost = function(host){
			if (host!="Hosts/Devices"){
				var hostPart=getHostPart(host);
				$("#row"+hostPart).removeClass("SelectedH");
				$("#row"+hostPart).addClass("notSelectedH");
			}
		};
		
		//function to add subrows Switches
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
				console.log("Last 1 "+last1);
				/*console.log("Penultuim "+last2_1);
				console.log("Ultimo "+last1);
				*/
				if (last1 < 7){
					$("#add_row_connection"+last2_1+last1).hide();
					last1++;	
					rowD = "<tr id='srow"+last2_1+last1+"' ><td></td><td><div class='dropdown'>"+
						"<button class='btn btnSP"+last2_1+last1+" btn-default dropdown-toggle'"+
						"type='button' data-toggle='dropdown'>Port number"+
						"<span class='caret'></span></button>"+
							"<ul class='dropdown-menu' id='dropdownSP"+last2_1+last1+"' >"+
								"<li><a href='#' data-value='1'>1</a></li>"+
								"<li><a href='#' data-value='2'>2</a></li>"+
								"<li><a href='#' data-value='3'>3</a></li>"+
								"<li><a href='#' data-value='4'>4</a></li>"+
								"<li><a href='#' data-value='5'>5</a></li>"+
								"<li><a href='#' data-value='6'>6</a></li>"+
								"<li><a href='#' data-value='7'>7</a></li>"+
								"<li><a href='#' data-value='8'>8</a></li>"+
							"</ul>"+
							"</div>"+
						"</td>"+
						"<td>"+
							"<div class='dropdown'>"+
								"<button  class='btn btnST"+last2_1+last1+" btn-default "+
									"dropdown-toggle' type='button'"+
										"data-toggle='dropdown'>Type"+
											"<span class='caret'></span>"+
												"</button>"+
												"<ul class='dropdown-menu' id='dropdownST"+last2_1+last1+"' >"+
													"<li><a href='#' "+ 
														"data-value='straight'>straight</a></li>"+
													"<li><a href='#' data-value='cross'>cross</a></li>"+
												"</ul>"+
							"</div>\n\
						<td>"+
							"<div class='dropdown'>"+
								"<button  class='btn btnSD"+last2_1+last1+" btn-default "+
									"dropdown-toggle' type='button'"+
										"data-toggle='dropdown'>Hosts/Devices<span class='caret'></span></button>"+
												"<ul class='dropdown-menu' id='dropdownSD"+last2_1+last1+"' >"+
												"</ul>"+
							"</div></td>"+
						"<td>"+
							"<button id='add_row_connection"+last2_1+last1+"' class='btn btn-success pull-left'>+</button>"+
							"<button id='delete_row_connection"+last2_1+last1+"' class='btn btn-danger pull-left delete_row_connection'>-</button>"+
						"</td></tr>";
					console.log("**SROW",srow);
					last1--;
					$("#delete_row_connection"+last2_1+last1).hide();
					$(rowD).insertAfter("#srow"+last2_1+last1);
					last1++;
					addSubRow("add_row_connection"+last2_1+last1,"srow"+last2_1+last1);
					deleteSubRow("delete_row_connection"+last2_1+last1);
					//assignValueByDropDown("dropdownSP"+last2_1+last1,"btnSP"+last2_1+last1);
					
					assignValueByDropDown("dropdownST"+last2_1+last1,"btnST"+last2_1+last1);
					
					seeDevice("btnSD"+last2_1+last1);
					assignConnnect("dropdownSD"+last2_1+last1);
					
					portsAvailable("btnSP"+last2_1+last1);
					assignPort("dropdownSP"+last2_1+last1);
					//$("#switchConfiguration").append(rowD);
				}
				//console.log("***Position " + position );
				//console.log("***CHildren " + $("#dropdownSP"+position).find('a').size());
				
			});
		};
		
		//function to delete the children of a switch (from its id)
		var deleteFollowingChildren = function(id,row){
			//console.log("***id :"+id+" *****row :"+row);
			//
			last1=0;
			lastC = row +""+ last1;
			//console.log("Children to eliminate :"+parseInt(last1));
			while ($("#srow"+lastC).length){
				//console.log("Children exists :"+last1);
				
				//alert(lastC);
				//alert($("#btnSD"+lastC).);
				releaseHost($(".btnSD"+lastC).text());
				//alert(text);
				$("#srow"+lastC).remove();
				last1++;
				lastC = row + "" +last1;
			}
			
		};
		
		
		//function to delete row Host/Switch
		var deleteRow = (function (id){
			$("#"+id).click(function(e){
				e.preventDefault();
				switch (id){
					case "delete_rowH" :
						var row = Octopus.getRow('h');
						var hostN = $("#name"+row).val();
						$("#row"+row).remove();
						//alert("'button:contains("+hostN+")'")
						$("button:contains("+hostN+")").html("Hosts/Devices"+
						"<span class='caret'> </span>");
						
						Octopus.decrement('h');
						break;
					case "delete_rowS" :
						var row = Octopus.getRow('s');
						var rowSupport = row-row;
						//var last1 = parseInt(id.slice(-1));
						
						Octopus.deleteSwitch(row);
					
						deleteFollowingChildren(id,row);
						//console.log("Rows"+row+rowSupport);
						//$("#srow"+row+rowSupport).remove();
						Octopus.decrement('s');
						break;
					default : break;
				}
			});
		});
		
		var deleteSubRow = function(id){
			$("#"+id).click(function(e){
				e.preventDefault();
				var length = getPartLength(id);
				var last2_1 = getSwitchPart(length,id);
				var last1 = parseInt(id.slice(-1));
				
				releaseHost($(".btnSD"+last2_1+""+last1).text());
				var PortToEliminate = $(".btnSP"+last2_1+""+last1).text();
				if (!isNaN(PortToEliminate)){
					Octopus.releaseSwitchPort(last2_1,PortToEliminate);
				}
				$("#srow"+last2_1+last1).remove();
				last1--;
				$("#add_row_connection"+last2_1+last1).show();
				$("#delete_row_connection"+last2_1+last1).show();	
			});
		}
		
		
		var seeDevice = function(id){
			$("."+id).click(function(){
				//number hosts
				var children = document.getElementById("hostConfiguration").children.length;
				var length = getPartLength(id);
				var last2_1 = getSwitchPart(length,id);
				var last1 = parseInt(id.slice(-1));
				
				$("."+id).parent().find("ul").empty();
				//console.log("Parent :",$("."+id).parent()[0]);
				//console.log("Ul :",$("."+id).parent().find("ul")[0]);
				
				//HostPart
				var devicesHtml ="<li class='dropdown-submenu'><a tabindex='-1' href='#'>Hosts</a>"+
						"<ul class='dropdown-menu scrollable-menu'>";
				for (var i=0;i < children; i++){
					if($("#row"+i).hasClass("notSelectedH")){
						//$("#row"+i).removeClass("notSelectedH"+i);
						//$("#row"+i).hasClass("SelectedH"+i);
						var nameH = $("#name"+i).val();
						//alert(nameH);
						devicesHtml = devicesHtml+"<li>"+
												"<a tabindex='-1'  href='#'  data-value='"+i+"' >"+nameH+
											"</a>"+
											"</li>";
						
						//$("#dropdownSD").append(hostHtml);
					}
				}
				
				//switch part
				devicesHtml =devicesHtml+"</ul></li><li class='dropdown-submenu'\n\
				><a tabindex='-1'\n\
				href='#'>Switches</a><ul class='dropdown-menu scrollable-menu'>";
				for (var i = 0; i < Octopus.getNumberOfSwitch(); i++ ){
					var idSwitch = Octopus.getSwitchId(i);
					console.log("Idswitch "+idSwitch+ " last2_1 "+last2_1);
					if (idSwitch != last2_1){
						/*devicesHtml = devicesHtml + "<li class='dropdown-submenu'"+
								"<a href = '#' data-value = '"+idSwitch+"'>Switch_"+
								idSwitch+"</a>"+
								"<ul class='dropdown-menu'>";
						*/
						var ports = Octopus.getSwitchPorts(idSwitch);
						for (var j = 0; j<ports.length; j++){
							//console.log("Ports l "+ports.length);
							//console.log("Ports"+ports[j]);
							devicesHtml = devicesHtml + "<li><a tabindex='-1' href='#' data-value='"+
									idSwitch+""+ports[j]+"'>Switch_"+idSwitch+" : Port_"+ports[j]+"</a></li>";
						}
						//devicesHtml=devicesHtml+"</ul></li>";
					}
				}
				devicesHtml = devicesHtml +"</ul></li>";
				//var numberOfSwitch = Octopus.getNumberOfSwitch();
				//console.log("Number of Switch ",numberOfSwitch);
				$("."+id).parent().find("ul").append(devicesHtml);		
				
			});
		};
		
		/*
		var getPortsAvailable = function(id){
			var arrayPorts=[1, 2, 3, 4, 5, 6, 7, 8];
			
			
			
			var length = getPartLength(id);
			
			var last2_1 = getSwitchPart(length,id);
			console.log("Last2_1 "+last2_1);
			//the last part is the port
			var last1 = parseInt(id.slice(-1));
			
			
			var exit = false;
			
			for (var i = 0; i<8 && !exit; i++){
				var classP = ".btnSP"+last2_1+""+i;
				if($(classP).length){
					value = $(classP).text();
					//console.log("VALUE "+value);
					if (!isNaN(parseInt(value))){
						var index = arrayPorts.indexOf(parseInt(value));
						//console.log("INDEX "+index);
						arrayPorts.splice(index,1);
						//console.log("ok");
					}
				}
				else{
					exit = true;
				}
			}
			
			//for (var i=0; i< arrayPorts.length;i++){
			//	console.log("*** length "+" value "+arrayPorts.length);
			//}
			
		   return arrayPorts;
			
			
		};
		*/
		
		//function to manage ports' availability
		var portsAvailable = function(id){
			$("."+id).click(function(){
				
				var length = getPartLength(id);
				var last2_1 = getSwitchPart(length,id);
				
				var arrayPorts = Octopus.getSwitchPorts(last2_1);
				 
				$("."+id).parent().find("ul").empty();
				//console.log("Parent :",$("."+id).parent()[0]);
				//console.log("Ul :",$("."+id).parent().find("ul")[0]);
				for (var i=0;i < arrayPorts.length; i++){
					
						
						//alert(nameH);
						//alert(arrayPorts[i]);
						var hostHtml = "<li>"+
											"<a href='#' data-value='"+arrayPorts[i]+"' >"+arrayPorts[i]+
											"</a>"+
										"</li>";
						$("."+id).parent().find("ul").append(hostHtml);	
						
						//$("#dropdownSD").append(hostHtml);
				}
				
			});
		};
		
		var assignPort = function(id){
			$("#"+id).on("click","li a", function(){
				var previousPort = $("#"+id).parent().find("button").text();	
				var length = getPartLength(id);
				var last2 = getSwitchPart(length,id);
				var last1 = id.slice(-1);
				var lastC = last2+""+last1;
				if (!isNaN(previousPort)){
					//console.log("LAst2 "+last2 + " PreviousPort "+previousPort);
					Octopus.releaseSwitchPort(last2,previousPort);
				}
				var newPort = $(this).text();
				//console.log("LAst2 "+last2 + " newPort "+newPort);
				Octopus.setSwitchPort(last2,newPort);
				$("."+"btnSP"+lastC+":first-child").html(newPort+"<span class='caret'> </span>");
				$("."+"btnSP"+lastC+":first-child").val(newPort);
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
				//alert("*PR "+previouSelected);
				var currentSelected = $(this).text();
				//The element is now available
				if (previouSelected!="Hosts/Devices"){
					if(previouSelected.indexOf("Port")>-1){
						var arraySplit = previouSelected.split(":");
						
						//find switch and its port
						var lengthS = getPartLength(arraySplit[0]);
						var last2S = getSwitchPart(length,arraySplit[0]);
						var port = arraySplit[1];
						var portN = port.charAt(port.indexOf('_')+1);
						
						Octopus.releaseSwitchPort(last2S,portN);
						console.log("Current selected "+currentSelected);
						
						//var lengthS = getPartLength(array);
						//var last2 = getSwitchPart(length,id);
					}
					else{
						if($("[value="+previouSelected+"]").parent().parent().hasClass("SelectedH")){
							$("[value="+previouSelected+"]").parent().parent().removeClass("SelectedH");
							$("[value="+previouSelected+"]").parent().parent().addClass("notSelectedH");
						}
					}
				}
			   

				//setting the value of the button
				$("."+"btnSD"+lastC+":first-child").html($(this).text()+"<span class='caret'> </span>");
				$("."+"btnSD"+lastC+":first-child").val($(this).text());
				
				//The new selected element is not available
				var hostPart=getHostPart(currentSelected);
				$("#row"+hostPart).removeClass("notSelectedH");
				$("#row"+hostPart).addClass("SelectedH");
				//alert("*PR "+previouSelected);
				
				//set port of switch as busy
				arraySplit = currentSelected.split(":");
				lengthS = getPartLength(arraySplit[0]);
				last2S = getSwitchPart(length,arraySplit[0]);
				port = arraySplit[1];
				portN = port.charAt(port.indexOf('_')+1);
				//console.log("Switch busy "+last2S +" Port busy "+portN);
				Octopus.setSwitchPort(last2S,portN);
			  
			});
		};
		
		addRow("add_rowH","tableH");
		addRow("add_rowS","tableS");

		deleteRow("delete_rowH");
		deleteRow("delete_rowS");
		//First row
		addSubRow("add_row_connection00","srow00");
		
		seeDevice("btnSD00");
		assignConnnect("dropdownSD00");
		
		portsAvailable("btnSP00");
		assignPort("dropdownSP00")
		
		var createXml = function(){
			var children = document.getElementById("hostConfiguration").children.length;
			//alert("Children number "+children);
			var hostConfigurationXml;
			hostConfigurationXml="<UserSolution>\n<Hosts>\n<Number>"+children+"</Number>\n";
			//hostConfigurationXml="<Hosts>\n";
			for (var i = 0;i<children;i++){
				var hName = $("#name"+i).val();
				//alert("#name"+i+"Hname ",hName);
				//alert("#ip"+i+"Hname ",hName);
				var hIpAddr = $("#ip"+i).val();
				var hNetM = $("#net"+i).val();
				var hGat = $("#gat"+i).val();
				var hSer = $("#ser"+i).val();
				//ViewHome.assignErrorCheck(i);
				hostConfigurationXml = hostConfigurationXml+"<Host>\n"+XmlViewCreator.element("Name",hName)+"\n"+
							XmlViewCreator.element("Ip",hIpAddr)+"\n"+
							XmlViewCreator.element("Netmask",hNetM)+"\n"+
							XmlViewCreator.element("Gateway",hGat)+"\n"+
							XmlViewCreator.element("Service",hSer)+"\n"
							+"</Host>\n";
				//XmlViewCreator.element()
			}
			hostConfigurationXml = hostConfigurationXml+"</Hosts>\n</UserSolution>";	
			//hostConfigurationXml = hostConfigurationXml+"</Hosts>";	
			return hostConfigurationXml;
		};
		
		
		$("#NetworkConfList").on('submit', function(e){ 
			e.preventDefault();
			var hostConfigurationXml = createXml();
			var xhr  = new XMLHttpRequest();
			xhr.open('POST',"http://localhost:3000/Solution",true);
			//xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			//xhr.setRequestHeader("Content-length", xmldata.length);
			xhr.addEventListener("readystatechange", processRequest, false);
			function processRequest(e) {
				if (xhr.readyState == 4 && xhr.status == 200) {
					console.log("OKKOKOKOK");
					$("#hostH").removeClass("active");
					$("#hostsDe").removeClass("active");
					$("#reportH").addClass("active");
					$("#reportDe").addClass("active");
					console.log("Server Response ",xhr.responseText);
					$("#reportDe").empty();
					$("#reportDe").html(xhr.responseText);
				}	
			}

			//var data = {'difficulty':'zero'};
			xhr.send(hostConfigurationXml);
			console.log(hostConfigurationXml);
		});
		
		$("#extended").append("");
	
		$("#compact").append("");
		
	}
};

