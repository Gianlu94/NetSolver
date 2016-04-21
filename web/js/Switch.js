/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


	
	var arraySwitch = [];
	
	var SwitchInterface = {
	
		init : function(){
			var Switch = {
				idS:0,
				p1:1,
				p2:2,
				p3:3,
				p4:4,
				p5:5,
				p6:6,
				p7:7,
				p8:8
			};
			arraySwitch.push(Switch);
		},
		
		createSwitch : function(id){
			//Switch object
			//console.log("I'm inserting switch "+ id);
			var Switch = {
				idS:id,
				p1:1,
				p2:2,
				p3:3,
				p4:4,
				p5:5,
				p6:6,
				p7:7,
				p8:8
			};
		
			arraySwitch.push(Switch);
		
		},
		
		getSwitchId : function (index){
			if (index < arraySwitch.length){
				console.log("*****id "+arraySwitch[index].idS);
				return arraySwitch[index].idS;
			}
		},
		
		getSwitch : function (id){
			for (var i = 0; i<arraySwitch.length;i++){
				var Switch = arraySwitch[i];
				//console.log("Searching for switch "+id);
				if (Switch.idS == id)
					return Switch;
			}
		},
		
		/*releasePortConnect: function(cport){
			console.log("CPor "+cport);
			if (cport!=0){
				var arraySplit = currentSelected.split(":");
				var lengthS = getPartLength(arraySplit[0]);
				var last2S = getSwitchPart(length,arraySplit[0]);
				var port = arraySplit[1];
				var portN = port.charAt(port.indexOf('_')+1);
				console.log("LIBERO Switch "+ last2S +" POrt"+portN);
			}
		},
		
		releaseSwitchPortConnect : function(sw){
			SwitchInterface.releasePortConnect(sw.c1);
			SwitchInterface.releasePortConnect(sw.c2);
			SwitchInterface.releasePortConnect(sw.c3);
			SwitchInterface.releasePortConnect(sw.c4);
			SwitchInterface.releasePortConnect(sw.c5);
			SwitchInterface.releasePortConnect(sw.c6);
			SwitchInterface.releasePortConnect(sw.c7);
			SwitchInterface.releasePortConnect(sw.c8);
		},
	*/
		
		deleteSwitch : function (id){
			var removed = false;
			for (var i = 0; i<arraySwitch.length && !removed;i++){
				var Switch = arraySwitch[i];
				if (Switch.idS == id){

					//SwitchInterface.releaseSwitchPortConnect(Switch);
					arraySwitch.splice(i,1);
					removed = true;
				}
			}
		},
		
		getSwitchPorts : function(id){
			var arrayPorts = [];
			var Switch = SwitchInterface.getSwitch(id);
			if (Switch.p1 != 0){
				arrayPorts.push(Switch.p1);
			}
			if (Switch.p2 != 0){
				arrayPorts.push(Switch.p2);
			}
			if (Switch.p3 != 0){
				arrayPorts.push(Switch.p3);
			}
			if (Switch.p4 != 0){
				arrayPorts.push(Switch.p4);
			}
			if (Switch.p5 != 0){
				arrayPorts.push(Switch.p5);
			}
			if (Switch.p6 != 0){
				arrayPorts.push(Switch.p6);
			}
			if (Switch.p7 != 0){
				arrayPorts.push(Switch.p7);
			}
			if (Switch.p8 != 0){
				arrayPorts.push(Switch.p8);
			}
			return arrayPorts;
		},

		getSwitchBusyPorts : function (id){
			var arrayPorts = [];
			var Switch = SwitchInterface.getSwitch(id);
			if (Switch.p1 == 0){
				arrayPorts.push(1);
			}
			if (Switch.p2 == 0){
				arrayPorts.push(2);
			}
			if (Switch.p3 == 0){
				arrayPorts.push(3);
			}
			if (Switch.p4 == 0){
				arrayPorts.push(4);
			}
			if (Switch.p5 == 0){
				arrayPorts.push(5);
			}
			if (Switch.p6 == 0){
				arrayPorts.push(6);
			}
			if (Switch.p7 == 0){
				arrayPorts.push(7);
			}
			if (Switch.p8 == 0){
				arrayPorts.push(8);
			}
			return arrayPorts;
		},
		
		SetSwitchPort : function(id,port){
			var found = false;
			for (var i = 0; arraySwitch.length && !found; i++){
				if (arraySwitch[i].idS == id){
					found = true;
					if (port == 1){
						arraySwitch[i].p1 = 0;
					}
					else if(port == 2){
						arraySwitch[i].p2 = 0;
					}
					else if(port == 3){
						arraySwitch[i].p3 = 0;
					}
					else if(port == 4){
						arraySwitch[i].p4 = 0;
					}
					else if(port == 5){
						arraySwitch[i].p5 = 0;
					}
					else if(port == 6){
						arraySwitch[i].p6 = 0;
					}
					else if(port == 7){
						arraySwitch[i].p7 = 0;
					}
					else if(port == 8){
						arraySwitch[i].p8 = 0;
					}
					
				}
			}
			
		},
		
		releaseSwitchPort : function (id,port){
			var found = false;
			for (var i = 0; arraySwitch.length && !found; i++){
				if (arraySwitch[i].idS == id){
					found = true;
					if (port == 1){
						arraySwitch[i].p1 = 1;
					}
					else if(port == 2){
						arraySwitch[i].p2 = 2;
					}
					else if(port == 3){
						arraySwitch[i].p3 = 3;
					}
					else if(port == 4){
						arraySwitch[i].p4 = 4;
					}
					else if(port == 5){
						arraySwitch[i].p5 = 5;
					}
					else if(port == 6){
						arraySwitch[i].p6 = 6;
					}
					else if(port == 7){
						arraySwitch[i].p7 = 7;
					}
					else if(port == 8){
						arraySwitch[i].p8 = 8;
					}
					
				}
			}
		},
		
		getArraySwitchLength : function(){
			return arraySwitch.length;
		},
		
		/*setConnectToSwitchPort : function(id,port,idpc){
			var found = false;
			console.log("Switch "+id+" Port:")
			for (var i = 0; arraySwitch.length && !found; i++){
				if (arraySwitch[i].idS == id){
					found = true;
					if (port == 1){
						arraySwitch[i].c1 = idpc;
					}
					else if(port == 2){
						arraySwitch[i].c2 = idpc;
					}
					else if(port == 3){
						arraySwitch[i].c3 = idpc;
					}
					else if(port == 4){
						arraySwitch[i].c4 = idpc;
					}
					else if(port == 5){
						arraySwitch[i].c5 = idpc;
					}
					else if(port == 6){
						arraySwitch[i].c6 = idpc;
					}
					else if(port == 7){
						arraySwitch[i].c7 = idpc;
					}
					else if(port == 8){
						arraySwitch[i].c8 = idpc;
					}
					
				}
			}
		}*/
	
	};





