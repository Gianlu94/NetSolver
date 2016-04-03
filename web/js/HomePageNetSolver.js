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
	},
	
	incrementAndGet : function(){
		this.row++;
		return this.row;
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
}

var Octopus = {
	
	init : function(){
		Model.init();
		ViewHome.init();
	},
	
	incrementRow : function(){
		return Model.incrementAndGet();
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
}

var ViewHome = {
	param:"",
	
	init : function(){
		$(".dropdown-menu li a").click(function(){
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
		
		$("#add_row").click(function(e){
			e.preventDefault();
			var row = Octopus.incrementRow();
			//alert("***ROW  "+ row);
			var rowH = "<tr id='row"+row+"'>"+
						"<td><input type='text' name='name"+row+
						"' placeholder='HostName' class='form-control'/></td>"+
						"<td><input type='text' name='ip"+row+
						"' placeholder='Ip address' class='form-control'/></td>"+
						"<td><input type='text' name='net"+row+
						"' placeholder='Netmask' class='form-control'/></td>"+
						"<td><input type='text' name='gat"+row+
						"' placeholder='Gateway' class='form-control'/></td>"+
						"<td><input type='text' name='ser"+row+
						"' placeholder='Service' class='form-control'/></td>";
			$("#tableH").append(rowH);
		});
		
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
			//hostConfigurationXml="<UserSolution>\n<Pippa>1</Pippa><Hosts>\n";
			//hostConfigurationXml="<Hosts>\n";
			for (var i = 0;i<children;i++){
				var hName = $("#name"+i).val();
				var hIpAddr = $("#ip"+i).val();
				var hNetM = $("#net"+i).val();
				var hGat = $("#gat"+i).val();
				var hSer = $("#ser"+i).val();
				hostConfigurationXml = "<Host>\n"+XmlViewCreator.element("Name",hName)+"\n"+
							XmlViewCreator.element("Ip",hIpAddr)+"\n"+
							XmlViewCreator.element("Netmask",hNetM)+"\n"+
							XmlViewCreator.element("Gateway",hGat)+"\n"+
							XmlViewCreator.element("Service",hSer)+"\n"
							+"</Host>\n";
				//XmlViewCreator.element()
			}
			//hostConfigurationXml = hostConfigurationXml + hosts +"</Hosts>\n</UserSolution>";	
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
}

