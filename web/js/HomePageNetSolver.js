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
	
	decrement : function(){
		if (this.row >= 1){
			this.row--;
			//alert("***Decrement"+this.row);
		}
	},
	
	rowIndex : function(){
		if (this.row > 0){
			return this.row;
		}
		else{
			return -1;
		}
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
	
	decrement : function(){
		Model.decrement();
	},
	
	getRow : function(){
		return Model.rowIndex();
	}
	
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
	
	init : function(){
		
		
		var assignValueByDropDown = function (id,btnCl){
			$("#"+id+ " li a").click(function(){
				//alert(this.text);
				//$(".btnD:first-child").text($(this).text())
				//ViewHome.param = this.text();
				//alert(ViewHome.param);

				$("."+btnCl+":first-child").html($(this).text()+"<span class='caret'> </span>");
				$("."+btnCl+":first-child").val($(this).text());
				ViewHome.param=($(this).text());
				//alert(ViewHome.param);
				//ViewHome.param = this.text();
			});
		};
		
		assignValueByDropDown("dropdownDI","btnD");
		assignValueByDropDown("dropdownSP","btnSP");
		assignValueByDropDown("dropdownST","btnST");
		
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
		
		$("#getP").click(function(){
			$("#extended").load("./text.txt");
		});
		
		var addRow = function(id,appendTo){
			$("#"+id).click(function(e){
				e.preventDefault();
				var rowD;
				switch (id){
					case "add_rowH" :
						var row = Octopus.incrementRow("h");
						rowD = "<tr id='row"+row+"'>"+
							"<td><input type='text' id='name"+row+"' name = 'nam"+row+
							"' placeholder='HostName' class='form-control'/></td>"+
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
						var row = Octopus.incrementRow("s");
						rowD = "<tr id='srow"+row+"'>"+
							"<td><input type='text' id='sname"+row+"' name = 'snam"+row+
							"' placeholder='Switch Name' class='form-control'/></td>"+
							"<td><div class='dropdown'>"+
								"<button class='btn btnSP"+row+" btn-default dropdown-toggle'"+
								"type='button' data-toggle='dropdown'>Port number"+
								 "<span class='caret'></span></button>"+
								 "<ul class='dropdown-menu' id='dropdownSP"+row+"' >"+
									"<li><a href='#' data-value='1'>1</a></li>"+
									"<li><a href='#' data-value='1'>2</a></li>"+
									"<li><a href='#' data-value='1'>3</a></li>"+
									"<li><a href='#' data-value='1'>4</a></li>"+
									"<li><a href='#' data-value='1'>5</a></li>"+
									"<li><a href='#' data-value='1'>6</a></li>"+
									"<li><a href='#' data-value='1'>7</a></li>"+
									"<li><a href='#' data-value='1'>8</a></li>"+
								"</ul>"+
								"</div>"+
							"</td>"+
							"<td>"+
							"<div class='dropdown'>"+
								"<button  class='btn btnST"+row+" btn-default "+
									"dropdown-toggle' type='button'"+
										"data-toggle='dropdown'>Type"+
											"<span class='caret'></span>"+
												"</button>"+
												"<ul class='dropdown-menu' id='dropdownST"+row+"' >"+
													"<li><a href='#' "+ 
														"data-value='straight'>straight</a></li>"+
													"<li><a href='#' data-value='cross'>cross</a></li>"+
												"</ul>"+
							"</div></td>"
							;
							$("#"+appendTo).append(rowD);
							assignValueByDropDown("dropdownSP"+row,"btnSP"+row);
							assignValueByDropDown("dropdownST"+row,"btnST"+row);
							
							
							
						break;
					default : break;
				}
			});
		};
		
		addRow("add_rowH","tableH");
		addRow("add_rowS","tableS");
		/*$("#add_row").click(function(e){
			e.preventDefault();
			var row = Octopus.incrementRow();
			//alert("***ROW  "+ row);
			var rowH = "<tr id='row"+row+"'>"+
						"<td><input type='text' id='name"+row+"' name = 'nam"+row+
						"' placeholder='HostName' class='form-control'/></td>"+
						"<td><input type='text' id='ip"+row+"' name = 'i"+row+
						"' placeholder='Ip address' class='form-control'/></td>"+
						"<td><input type='text' id='net"+row+"' name = 'ne"+row+
						"' placeholder='Netmask' class='form-control'/></td>"+
						"<td><input type='text' id='gat"+row+"' name = 'ga"+row+
						"' placeholder='Gateway' class='form-control'/></td>"+
						"<td><input type='text' id='ser"+row+"' name = 'se"+row+
						"' placeholder='Service' class='form-control'/></td>";
			$("#tableH").append(rowH);
		});
		*/
		$("#delete_row").click(function(e){
			e.preventDefault();
			var row = Octopus.getRow();
			//alert("***ROW" + row);
			$("#row"+row).remove();
			//alert("***ROW" + row);
			Octopus.decrement();
			
		});
		
		
		
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
		
		$("#extended").append("ciiancsnfvbsfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbfbffbf\n\
		fbffbffbbbbbbbbbbbbbbbbbbbb\n\
		vffvsfvvvvvvvvvvvvf");
	
		$("#compact").append("dvsfvfsvfsvsfvfsvfv\n\
		vfsvfsfvfsvsf\n\
		cdvdvd");
	}
};

